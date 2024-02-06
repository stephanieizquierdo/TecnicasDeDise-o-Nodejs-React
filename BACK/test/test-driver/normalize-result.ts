import { Discount, ProcessedProduct } from "./types";

export function normalizeResult(
	products: ProcessedProduct[]
): ProcessedProduct[] {
	function comparePrimitive<T>(left: T, right: T): number {
		return left === right ? 0 : left < right ? -1 : 1;
	}
	const compareDiscount = (left: Discount, right: Discount) =>
		comparePrimitive(left.type, right.type) ||
		comparePrimitive(left.value, right.value);

	return products
		.map(product => ({
			product: product.product,
			discounts: product.discounts.sort(compareDiscount)
		}))
		.sort((left, right) => {
			const l = JSON.stringify(left);
			const r = JSON.stringify(right);
			return comparePrimitive(l, r);
		});
}
