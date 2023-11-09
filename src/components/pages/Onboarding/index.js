import React, { Suspense, createContext, useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames";
import merge from "lodash.merge";

import Section from "@wrappers/Section";
import Loader from "@elements/Loader";
import { Checkmark } from "@elements/Icon";

import xhr from "@services/xhr";
import localDb from "@services/localDb";
import { onboardingStepsMap, defaultTheme } from "@themes/map";

import './index.sass';
import { container } from './onboarding.module.sass';

export const OnboardingContext = createContext();

export default function Onboarding () {

	const [fullForm, setFullForm] = useState();
	const setPartial = (partial) => {
		const currentFormState = merge(fullForm, partial);
		localDb.set('onboarding', currentFormState);
		return setFullForm(currentFormState);
	};

	const [introStep, setIntroStep] = useState(true);
	const hideIntro = () => setIntroStep(false);
	const [steps, setSteps] = useState([]);

	// when redirected to the onboarding page, the user could have a slug and theme in localstorage
	// we can only load it on the browser since there's no localstorage on the server
	useEffect(() => {
		setFullForm(merge({
			slug: `trial-${Math.random().toString(36).substring(2, 8)}`,
			theme: defaultTheme,
			content: { submitText: 'שלח' }
		}, localDb.get('onboarding') || {}));
	}, []);

	if (!fullForm) return <Loader />;

	const OnboardingSteps = onboardingStepsMap[fullForm?.theme];

	// a logged in user should be redirected to the editor
	if (localDb.get('jwt')) return navigate('/editor', { replace: true });

	const current = steps.find(step => step.isActive)?.title;

	const containerClassName = classNames(container, 'pt-4');

	return <OnboardingContext.Provider value={{ setup, next, current, defaultValues: fullForm }}>
		<div className={containerClassName}>

			<Section noTopMargin>

				{steps && <StepsBar {...{ steps }} />}
				<Header />

				<Section className="is-small">

					{introStep && <div className="content">
						<p>בעוד מספר דקות - בתום שאלון זה - תעברו לתצוגה מקדימה של העמוד שיצרתם.</p>
						<p>כל השדות הם חובה ואת כולם אפשר לשנות בקלות ובכל עת.</p>
						<CTA onClick={hideIntro}>
							אחלה
						</CTA>
					</div>}

					<div className={introStep ? 'is-hidden' : ''}>
						<Suspense fallback={<Loader />}>
							<OnboardingSteps />
						</Suspense>
					</div>

				</Section>

			</Section>

		</div>
	</OnboardingContext.Provider>;

	function setup(title) {
		setSteps((currentSteps) => currentSteps.concat({
			title,
			isActive: !currentSteps.length
		}));
	}

	function next(data) {
		setPartial(data);

		const activeIndex = steps.findIndex(step => step.isActive);

		const nextSteps = steps.map((step, index) => {
			step.isDone = index <= activeIndex;
			step.isActive = index === activeIndex + 1;
			return step;
		});

		// if nextSteps has no active step than current step was the last step
		if (!nextSteps.find(step => step.isActive)) return submitForm();

		setSteps(nextSteps);
	}

	function submitForm() {

		// eslint-disable-next-line no-unused-vars
		const { internal, ...form } = fullForm;

		// send the fullForm to server
		// when users will be able to create more than one site - this will be changed from createTrial to a createSite request
		xhr.createTrial(form).then(({ jwt }) => {
			// reset the onboarding cache from localstorage
			localDb.unset('onboarding');
			// save the jwt to localstorage
			localDb.set('jwt', jwt);
			// go to editor
			navigate('/editor');
		});
	}

}

export function Step ({ title, children }) {
	const { setup, next, current, defaultValues } = useContext(OnboardingContext);

	const form = useForm({
		mode: 'onChange',
		defaultValues
	});

	const [isSubmitting, setSubmitting] = useState();
	const onSubmit = (event) => {
		form.handleSubmit((data) => {
			setSubmitting(true);
			next(data);
		})(event);
	};

	useEffect(() => setup(title), []);

	if (current !== title) return null;

	return <FormProvider {...form}>
		<form onSubmit={onSubmit}>
			{children}
			<CTA isSubmitting={isSubmitting}>
				הלאה
			</CTA>
		</form>
	</FormProvider>;
}

function Header() {
	return <div className="has-text-centered">
		<h1 className="title mt-6">שאלון קצר להקמת אתר</h1>
	</div>;
}

function StepsBar ({ steps }) {
	if (!steps.length) return null;
	return <ul className="steps has-content-centered is-balanced is-horizontal is-small">
		{steps.map(({ title, isActive, isDone }, index) => {
			const className = classNames('steps-segment', isActive && 'is-active');
			const markerClassName = classNames("steps-marker", isActive && 'is-white');
			return <li key={title} className={className}>
				<span className={markerClassName}>
					{isDone ? <Checkmark style={{ fontSize: '1.75rem' }} /> : index + 1}
				</span>
				<div className="steps-content">
					<span className="is-size-5-tablet">{title}</span>
				</div>
			</li>;
		})}
	</ul>;
}

function CTA ({ isSubmitting, onClick = ()=>null, children }) {
	const buttonClassName = classNames("button is-primary", isSubmitting && 'is-loading');
	return <div className="is-flex is-justify-content-end mt-5">
		<button {...{ onClick }} className={buttonClassName}>
			{children}
		</button>
	</div>;
}