export default function hrefByAddressType(type, address) {
	return type === 'email' ? `mailto:${address}` : type === 'phone' ? `tel:${address}` : address;
}