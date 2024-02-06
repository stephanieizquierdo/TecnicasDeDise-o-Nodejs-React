import { offers, offersExtra, products } from "./data";
import { normalizeResult } from "./normalize-result";
import { initializeOffers, processProducts } from "./test-driver";
import { Cart, Discount } from "./types";
import expect from 'expect';

describe("acceptance tests 2", () => {
	const state = initializeOffers(offersExtra);

	it("should get 30% off with Galicia credit", () => {
		const cart: Cart = {
			products,
			payment: {
				method: "CREDIT",
				entity: "GALICIA"
			},
			purchase_date: {
				year: 1996,
				month: 7,
				day_number: 20,
				week_day: "Wednesday",
				week_number: 29
			}
		};
		const result = processProducts(state, cart);

		const expectedDiscount: Discount[] = [
			{
				type: "CART_PERCENTAGE",
				value: 30
			}
		];
		expect(normalizeResult(result)).toEqual(
			normalizeResult(
				products.map(product => ({
					discounts: expectedDiscount,
					product: product
				}))
			)
		);
	});

	it("should get 1% off on thursday for things less expensive than 175", () => {
		const cart: Cart = {
			products,
			payment: {
				method: "CHEQUE",
				entity: "SANTANDER"
			},
			purchase_date: {
				year: 1959,
				month: 1,
				day_number: 6,
				week_day: "Thursday",
				week_number: 2
			}
		};
		const result = processProducts(state, cart);

		const expectedDiscount: Discount[] = [
			{
				type: "PRODUCT_PERCENTAGE",
				value: 1
			}
		];
		expect(normalizeResult(result)).toEqual(
			normalizeResult(
				products
					.filter((_, index) => index != 1)
					.map(product => ({
						discounts: expectedDiscount,
						product
					}))
			)
		);
	});

	it("should get 10% off on 10.5% iva on friday", () => {
		const cart: Cart = {
			products,
			payment: {
				method: "CREDIT",
				entity: "MACRO"
			},
			purchase_date: {
				year: 2022,
				month: 6,
				day_number: 3,
				week_day: "Friday",
				week_number: 22
			}
		};
		const result = processProducts(state, cart);

		const expectedDiscount: Discount[] = [
			{
				type: "CART_PERCENTAGE",
				value: 10
			}
		];
		expect(normalizeResult(result)).toEqual(
			normalizeResult(
				products.map(product => ({
					discounts: expectedDiscount,
					product: product
				}))
			)
		);
	});
});