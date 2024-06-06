import { useFormContext } from "react-hook-form";

export default function useUniqueValidation(itemId, uniquePropKey, uniquePropName = uniquePropKey) {
	const { getValues } = useFormContext();

	if (!itemId) return {};

	const hayId = itemId.split('.').slice(0, -1).join('.');
	const itemIndex = Number(itemId.split('.').pop());

	const availableUniqueProps = getValues(hayId)
		.filter((item, availableIndex) => availableIndex !== itemIndex)
		.map((item) => item[uniquePropKey]);

	return { unique: validateUniqueness(availableUniqueProps, `This ${uniquePropName} already exists.`) };

	function validateUniqueness(hay, errorMessage) {
		return (needle) => hay.every((item) => item !== needle) || errorMessage;
	}

}