// a function that queries the URL for a specified search parameter and removes it from the URL
// useful for avoiding ugly URLs when using query parameters for one-time use

export default function snatchParameter(paramName) {

	// Get the URLSearchParams
	const params = (new URL(document.location)).searchParams;

	// Get the value of the specified parameter
	const param = params.get(paramName);

	// If the parameter doesn't exist, return null
	if (!param) return null;

	// Remove the specified parameter
	params.delete(paramName);

	// Get the remaining parameters as a string
	const updatedParams = params.toString();

	// Update the URL without the specified parameter
	// remove ? if there are no parameters
	// (This is done to prevent the user from going back to the page with the parameter)
	window.history.replaceState({}, '', `${window.location.pathname}${updatedParams ? `?${updatedParams}` : ''}`);

	// Return the value of the parameter
	return param;
}