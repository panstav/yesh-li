import { createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import hideHash from "@lib/hide-hash";

import { container, svgBackground } from "./theme.module.sass";

import Hero from "./Hero";
import Services from "./Services";
import Statement from "./Statement";
import Spacer from "../../elements/Spacer";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

export const PageContext = createContext();

export default function Elyse_01({ mainColor, content }) {

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
				'--color-primary': `var(--color-${mainColor})`,
				'--color-primary-half': `var(--color-${mainColor}-half)`,
				'--color-primary-quarter': `var(--color-${mainColor}-quarter)`
			}}>

				<Hero />

				{content.statement && <Statement />}

				<div className="is-relative py-6">
					<BackgroundSvg />

					<Services />

					<Spacer />

					<ContactForm />

					<Spacer />
					<Spacer />
				</div>

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

function BackgroundSvg() {
	return <div style={{ position: 'absolute', top: '0', insetInlineEnd: '0', bottom: '0', zIndex: '-10000' }}>
		<svg className={svgBackground} style={{ height: '100%', width: 'auto' }} viewBox="0 0 540 960" width="540" height="960" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<path d="M114 0L119.7 40C125.3 80 136.7 160 130.7 240C124.7 320 101.3 400 100.5 480C99.7 560 121.3 640 111.2 720C101 800 59 880 38 920L17 960L0 960L0 920C0 880 0 800 0 720C0 640 0 560 0 480C0 400 0 320 0 240C0 160 0 80 0 40L0 0Z" />
			<path d="M105 0L101.5 40C98 80 91 160 83.2 240C75.3 320 66.7 400 63.5 480C60.3 560 62.7 640 70.2 720C77.7 800 90.3 880 96.7 920L103 960L0 960L0 920C0 880 0 800 0 720C0 640 0 560 0 480C0 400 0 320 0 240C0 160 0 80 0 40L0 0Z" />
			<path d="M37 0L30.8 40C24.7 80 12.3 160 19.3 240C26.3 320 52.7 400 55.2 480C57.7 560 36.3 640 31.7 720C27 800 39 880 45 920L51 960L0 960L0 920C0 880 0 800 0 720C0 640 0 560 0 480C0 400 0 320 0 240C0 160 0 80 0 40L0 0Z" />
		</svg>
	</div>;
}