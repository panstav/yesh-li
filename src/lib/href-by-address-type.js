export default function hrefByAddressType(type, address) {
	switch (type) {
	case 'email':
		return `mailto:${address}`;
	case 'phone':
		return `tel:${address}`;
	case 'whatsapp':
		return `https://wa.me/${address}`;
	default:
		return address;
	}
}