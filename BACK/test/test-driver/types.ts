export type RuleReference = string;

export type SimpleRule = {
	code?: RuleReference;
	description: string;
	field: string;
} & (
	| {
			type: "EQUALS" | "DISTINCT";
			value: string | number;
	  }
	| {
			type: "HIGHER" | "LOWER";
			value: number;
	  }
	| {
			type: "IN";
			value: (string | number)[];
	  }
);

export type CompositeRule = {
	code?: RuleReference;
} & (
	| {
			type: "AND" | "OR";
			rules: AnyRule[];
	  }
	| {
			type: "NOT";
			rules: AnyRule;
	  }
);

export type RuleLiteral = SimpleRule | CompositeRule;

export type AnyRule = RuleLiteral | RuleReference;

export interface Discount {
	type: "PRODUCT_PERCENTAGE" | "CART_PERCENTAGE" | "FIX";
	value: number;
}

export interface Offer {
	description: string;
	code: string;
	rule: AnyRule;
	discount: Discount;
}

export interface Offers {
	rules: RuleLiteral[];
	offers: Offer[];
}

export interface Product {
	name: string;
	brand: {
		code: string;
		name: string;
	};
	category: {
		code: string;
		name: string;
	};
	price: number;
	iva_percentage: number;
	code: string;
}

export interface Cart {
	products: Product[];
	payment: {
		method: string;
		entity: string;
	};
	purchase_date: {
		year: number;
		month: number;
		day_number: number;
		week_day:
			| "Monday"
			| "Tuesday"
			| "Wednesday"
			| "Thursday"
			| "Friday"
			| "Saturday"
			| "Sunday";
		week_number: number;
	};
}

export interface ProcessedProduct {
	product: Product;
	discounts: Discount[];
}
