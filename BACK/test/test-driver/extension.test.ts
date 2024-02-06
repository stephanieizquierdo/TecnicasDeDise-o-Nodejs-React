import {
	offers,
	offersExtra,
	offersWithLoop,
	offersWithMissingLink,
	products
} from "./data";
import { normalizeResult } from "./normalize-result";
import { initializeOffers, processProducts } from "./test-driver";
import { Cart, Discount } from "./types";
import expect from 'expect';

describe("extension tests", () => {
	const someCart: Cart = {
		products,
		payment: {
			method: "CREDIT",
			entity: "SANTANDER"
		},
		purchase_date: {
			year: 2022,
			month: 1,
			day_number: 3,
			week_day: "Monday",
			week_number: 1
		}
	};

	it("should reject offers with a missing rule", () => {
		expect(() => {
			const state = initializeOffers(offersWithMissingLink);
			processProducts(state, someCart);
		}).toThrow();
	});

	it("should reject offers with a rule loop", () => {
		expect(() => {
			const state = initializeOffers(offersWithLoop);
			processProducts(state, someCart);
		}).toThrow();
	});

	it("should accept empty offers", () => {
		const state = initializeOffers({
			offers: [],
			rules: []
		});
		const result = processProducts(state, someCart);
		expect(result).toEqual([]);
	});

	it("should accept interleaved use of multiple offer sets", () => {
		const state1 = initializeOffers(offers);
		const state2 = initializeOffers(offersExtra);

		const cart1: Cart = {
			products,
			payment: {
				method: "CREDIT",
				entity: "SANTANDER"
			},
			purchase_date: {
				year: 2022,
				month: 2,
				day_number: 13,
				week_day: "Sunday",
				week_number: 7
			}
		};
		const result1 = processProducts(state1, cart1);

		const expectedDiscount1: Discount[] = [
			{
				type: "PRODUCT_PERCENTAGE",
				value: 10
			}
		];
		expect(normalizeResult(result1)).toEqual(
			normalizeResult([
				{ discounts: expectedDiscount1, product: products[0] },
				{ discounts: expectedDiscount1, product: products[1] },
				{ discounts: expectedDiscount1, product: products[2] }
			])
		);

		const cart2: Cart = {
			products,
			payment: {
				method: "CREDIT",
				entity: "GALICIA"
			},
			purchase_date: {
				year: 1996,
				month: 2,
				day_number: 21,
				week_day: "Wednesday",
				week_number: 8
			}
		};
		const result2 = processProducts(state2, cart2);

		const expectedDiscount2: Discount[] = [
			{
				type: "CART_PERCENTAGE",
				value: 30
			}
		];
		expect(normalizeResult(result2)).toEqual(
			normalizeResult(
				products.map(product => ({
					discounts: expectedDiscount2,
					product: product
				}))
			)
		);
	});
});
