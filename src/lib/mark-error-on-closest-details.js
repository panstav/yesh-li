export default function markErrorOnClosestDetails(elem, hasErrors = true, isolate) {
	iterate(elem, hasErrors, isolate);
}

function iterate(elem, hasErrors, isolate) {

	const detailsElem = elem.parentElement.closest('details');
	if (!detailsElem) return;

	const attrName = `data-has-${isolate ? 'other-' : ''}errors`;
	if (hasErrors) detailsElem.setAttribute(attrName, 'true');
	else detailsElem.removeAttribute(attrName);

	iterate(detailsElem, hasErrors, isolate);
}