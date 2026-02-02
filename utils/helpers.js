export function formatPrice(price, locale = 'en-US', currency = 'USD') {
	const value = typeof price === 'number' ? price : Number(price) || 0;
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export default formatPrice;