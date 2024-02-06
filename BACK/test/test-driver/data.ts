import { Offers, Product } from "./types";
import untypedProducts from "./products.json";
import untypedOffers from "./offers.json";
import untypedExtraOffers from "./extra-offers.json";

export const products: Product[] = untypedProducts as Product[];

export const offers: Offers = untypedOffers as Offers;
export const offersExtra: Offers = untypedExtraOffers as Offers;

export const offersWithMissingLink: Offers = {
	rules: [],
	offers: [
		{
			code: "ERR001",
			description: "This offer should error out (Missing reference)",
			discount: {
				type: "FIX",
				value: 1
			},
			rule: "NONEXISTANT_RULE"
		}
	]
};

export const offersWithLoop: Offers = {
	rules: [
		{
			code: "LOOP",
			type: "NOT",
			rules: "LOOP"
		}
	],
	offers: [
		{
			code: "ERR002",
			description: "This offer should error out (Loop)",
			discount: {
				type: "CART_PERCENTAGE",
				value: 2
			},
			rule: "LOOP"
		}
	]
};
