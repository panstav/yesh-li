import { FormProvider } from 'react-hook-form';

import useCustomForm from "@hooks/use-custom-form";

export default function Form({ disableAutoFocus, defaultValues, onSubmit, shouldUseNativeValidation, className, children }) {

	const { ref, form } = useCustomForm({ autoFocus: !disableAutoFocus, defaultValues, shouldUseNativeValidation });

	const formProps = {
		ref,
		onSubmit: form.handleSubmit(onSubmit),
		className
	};

	return <FormProvider {...form}>
		<form {...formProps}>
			{children}
		</form>
	</FormProvider>;

}