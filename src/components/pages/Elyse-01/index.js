import { createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import hideHash from "@lib/hide-hash";

import { container } from "./theme.module.sass";

import Hero from "./Hero";
import Services from "./Services";
import Statement from "./Statement";
import Spacer from "../../elements/Spacer";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

export const PageContext = createContext();

export default function Elyse_01({ content }) {

	const form = useForm({ shouldUseNativeValidation: true });

	content.sections.map((section, index) => {
		section.anchor = `section-${index}`;
		return section;
	});

	Object.entries(content.socials).map(([type, address]) => {
		if (!address) delete content.socials[type];
	});

	const css = {
		border: `3px solid var(--color-primary-half)`
	};

	return <PageContext.Provider value={{ css, content }}>
		<FormProvider {...form}>
			<div className={container} style={{
				'--color-primary': `var(--color-${content.mainColor})`,
				'--color-primary-half': `var(--color-${content.mainColor}-half)`,
				'--color-primary-quarter': `var(--color-${content.mainColor}-quarter)`
			}}>

				<Hero />

				{content.statement && <Statement />}

				<Services />

				<ContactForm />

				<Spacer />
				<Spacer />

				<Footer />

			</div>
		</FormProvider>
	</PageContext.Provider>;
}

export function onClickMarkInterest(interest, markerFn) {
	const onClick = ({ currentTarget: { dataset: { interest } } }) => {
		hideHash();
		return markerFn('interest', interest);
	};
	return { onClick, 'data-interest': interest };
}