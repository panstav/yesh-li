import OutboundLink from "@elements/OutboundLink";

import { usePageContent } from "@hooks/use-site-data";

import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import SmallSection from "@themes/tom-01/Theme/elements/SmallSection";

import SignupForm from "./Form";

export default function ContactPage () {

	const { title, subtitle } = usePageContent('contact');

	return <>
		<PageHeader {...{ title, subtitle }} />
		<SmallSection>
			<SignupForm />
			<div className="has-text-centered">
				<p className="is-size-5 reset-anchors mt-6 mb-1">Or just send a mail to <OutboundLink href="mailto:tombezrukov@gmail.com">tombezrukov@gmail.com</OutboundLink></p>
			</div>
		</SmallSection>
	</>;
}