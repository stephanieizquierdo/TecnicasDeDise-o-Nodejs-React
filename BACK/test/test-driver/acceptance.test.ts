import { offers, offersExtra, products } from "./data";
import { normalizeResult } from "./normalize-result";
import { initializeOffers, processProducts } from "./test-driver";
import { Cart, Discount } from "./types";
import expect from 'expect';

describe("acceptance tests 1", () => {
	const state = initializeOffers(offers);

	it("should get 10% discount in dairy products in february", () => {
		const cart: Cart = {
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
		const result = processProducts(state, cart);

		const expectedDiscount: Discount[] = [
			{
				type: "PRODUCT_PERCENTAGE",
				value: 10
			}
		];
		expect(normalizeResult(result)).toEqual(
			normalizeResult([
				{ discounts: expectedDiscount, product: products[0] },
				{ discounts: expectedDiscount, product: products[1] },
				{ discounts: expectedDiscount, product: products[2] }
			])
		);
	});

	it("should get 7 discount in a Fanta in June", () => {
		const fanta = products.filter(x => x.name === "Naranja 1L");
		const cart: Cart = {
			products: fanta,
			payment: {
				method: "CREDIT",
				entity: "SANTANDER"
			},
			purchase_date: {
				year: 2022,
				month: 6,
				day_number: 21,
				week_day: "Tuesday",
				week_number: 25
			}
		};
		const result = processProducts(state, cart);

		const expectedDiscount = [
			{
				type: "FIX",
				value: 7
			}
		];
		expect(result).toEqual([
			{ discounts: expectedDiscount, product: fanta[0] }
		]);
	});

	it("should not get 7 discount in a Fanta in July", () => {
		const fanta = products.filter(x => x.name === "Naranja 1L")[0];
		const cart: Cart = {
			products: [fanta],
			payment: {
				method: "CREDIT",
				entity: "SANTANDER"
			},
			purchase_date: {
				year: 2022,
				month: 7,
				day_number: 21,
				week_day: "Thursday",
				week_number: 29
			}
		};
		const result = processProducts(state, cart);

		expect(result).toEqual([]);
	});

	it("should get no discount in the bougth paying with Santander Credit in January", () => {
		const cart: Cart = {
			products,
			payment: {
				method: "CREDIT",
				entity: "SANTANDER"
			},
			purchase_date: {
				year: 2022,
				month: 1,
				day_number: 1,
				week_day: "Saturday",
				week_number: 1
			}
		};
		const result = processProducts(state, cart);

		expect(result).toEqual([]);
	});

	it("should get 25% discount in the bougth paying with Macro Credit in July", () => {
		const cart: Cart = {
			products,
			payment: {
				method: "CREDIT",
				entity: "MACRO"
			},
			purchase_date: {
				year: 2022,
				month: 7,
				day_number: 21,
				week_day: "Thursday",
				week_number: 29
			}
		};
		const result = processProducts(state, cart);

		const expectedDiscount: Discount[] = [
			{
				type: "CART_PERCENTAGE",
				value: 25
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

	it("should get 15% discount in a Leche Chocolatada 1L in Febrary paying with Galicia", () => {
		const leche = products.filter(
			x => x.name === "Leche Chocolatada 1L, la Calmisima"
		);
		const cart: Cart = {
			products: leche,
			payment: {
				method: "CREDIT",
				entity: "Galicia"
			},
			purchase_date: {
				year: 2022,
				month: 2,
				day_number: 2,
				week_day: "Wednesday",
				week_number: 5
			}
		};
		const result = processProducts(state, cart);

		const expectedDiscount: Discount[] = [
			{
				type: "PRODUCT_PERCENTAGE",
				value: 15
			},
			{
				type: "PRODUCT_PERCENTAGE",
				value: 10
			}
		];
		expect(normalizeResult(result)).toEqual(
			normalizeResult([{ discounts: expectedDiscount, product: leche[0] }])
		);
	});
});


