import { useContext } from "react";
import { I18nContext } from "@config/I18n";

export default function useI18n () {
	const i18n = useContext(I18nContext);
	return [i18n, i18n];
}

export function useFieldLabels() {
	const [{ Editor: { fieldLabels } }] = useI18n();
	return fieldLabels;
}