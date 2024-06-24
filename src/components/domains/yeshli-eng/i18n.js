import OutboundLink from "@elements/OutboundLink";

import YeshLiLogo from "@domains/yeshli/elements/Logo";
import regexes from "@lib/regexes";

const i18n = {

	multi: {
		Logo: YeshLiLogo,
		FatalErrorModal,
		four_0_four_title: 'Page wasn\'t found',
		Four0FourSubtitle
	},

	Login: {
		session_over_please_reconnect: "Your session has ended - please reconnect",
		connect: "Connect",
		email_registered_with: "The email you registered with",
		remember_me: "Remember me",
		why_remember_me: "Check to stay connected for longer",
		SendLoginLinkButtonText: ({ isTried }) => <>Send me {isTried ? 'another' : 'a'} login link</>,
		link_successfully_sent_to: "A link and a code for verification have been sent to your email",
		validation: "Validation",
		code_you_received: "The code you received by email",
		email_address_verification: "Email address verification",
		digitsOnlyWhileYouPasted: (badPaste) => `The code should contain digits only. You tried to paste: '${badPaste}'`,
		bad_verification_code: "The verification code is incorrect",
	},

	Editor: {

		NewPageModal,

		fieldLabels: {

			alt_description: "Won't appear visually, intended only for screen readers and SEO.",
			select_label: 'Select from the list',
			required_field: 'Required field',
			minLengthField: (minLength) => minLength === 1 ? 'Minimum 1 character' : `Minimum ${minLength} characters`,
			maxLengthField: (maxLength) => `Maximum ${maxLength} characters`,

			invalid_url: 'Invalid URL',
			invalid_relative_url: 'Invalid relative URL',
			invalid_phone_number: 'Invalid phone number',
			invalid_email: 'Invalid email address',
			errors_are_red: "Problems in page editing are displayed in red",
			page_successfully_saved: "Page saved successfully!",
			page_failed_saving: "An error occurred while saving the page. The page was not updated - please contact us as soon as possible",
			submit: 'Save',
			urlMissingOn: (includes) => `The URL should include "${includes}"`,
			country_phone_code: '+972',
			minItemsRepeater: (minItems) => minItems === 1 ? 'At least 1 item' : `At least ${minItems} items`,
			maxItemsRepeater: (maxItems) => `Maximum ${maxItems} items`,
			go_to_page: "Go to page",
			move_up: "Move up",
			move_down: "Move down",
			remove: "Remove",
			addItem: (singleName) => `Add ${regexes.startsWithVowel.test(singleName) ? 'an' : 'a'} ${singleName}`,
			image_types_supported: "Supported file types",
			image_alt: "Image alt text",
			click_to_choose_image: 'Click to choose an image',
			click_to_change_image: 'Click to change the image',
			set_image_focus: 'Set image focus',
			ModerationInvalidatedModal,
			ExtensionMatchesFileDoesNot,
			image_upload_error: 'An error occurred while uploading the image. Please try again later',

			title: 'Title',
			description: 'Description',
		},

		Header: {
			my_leads_sheet: "My Leads Sheet",
			slug_updated_successfully: "The URL has been updated, in less than an hour your page will be accessible.",
			log_out: "Log out",
			public_site: "Public site",
			publish_site: "Publish site",
			choose_slug: "Choose URL",
			choose_domain: "Choose domain",
			go_to_site: "Go to site",
			email_verified_successfully: "Email address verified successfully.",
		},

		Preview: {
			no_preview_while_invalid: "The preview doesn't update when there are problems in page editing"
		},

		TrialNotice: {
			page_is_temporary: "This page is temporary",
			signup_to_keep: "Sign up now to keep it",
			registration: "Registration",
			email_validation_instruction: "When you click 'Continue' the system will send an email that will help us verify that the email address is valid and that you have access to it. With this email address you will be able to log in to the system without needing a password.",
			link_successfully_sent_to: "The email has been sent successfully to",
			upgrades_updates_consent: "I'd like to receive updates about upgrades and new features",
			products_services_updates_consent: "I'd like to receive updates about promotions and related services",
		},

		AttachSlug: {
			title: "Fixed URL for page",
			valid_slug_requirements: "The page URL can contain only English letters, numbers, and hyphens.",
			submit_label: "Save",
			address_unavailable: "This address is unavailable."
		},

		AttachDomain: {
			attach_domain_to_site: "Attach domain to site",
			use_existing_domain: "Use existing domain",
			buy_new_domain: "Buy new domain",
			BuyingDomainUnavailable,
			attaching_domain_wait_or_come_later: "The system is preparing the site for domain connection. This action may take a few minutes, you can wait for it to finish or close the page and come back later.",
			site_ready_for_domain: "The system is ready to connect your domain.",
			set_nameservers_to_complete: "In order to complete the connection, you need to set the following Name Servers with the provider with whom you registered the domain.",
			required_nameservers: "Desired name servers",
			current_nameservers: "Current name servers",
			no_nameservers_found: "No name servers have been registered for this domain yet.",
			domain_url: "Domain URL",
			domain_url_pattern_error: 'The URL can contain only English letters, numbers, and hyphens.',
			ContactUs: AttachDomainContactUs,
			DomainAttachedSuccessFullyModal

		}
	},

	misc: {
		email_address: "Email address",
		last_update: "Last update",
		continue: "Continue",
	}

};

export default i18n;

function ExtensionMatchesFileDoesNot({ allowedTypes }) {
	return <>
		<p>{i18n.Editor.fieldLabels.image_types_supported}: <span style={{ direction: 'ltr', display: 'inline-block' }}>{allowedTypes}</span></p>
		<p>The file you chose has a supported extension but is of a different type.</p>
	</>;
}

function NewPageModal() {
	return <>
		<p>Your page is ready!</p>
		<div className='is-size-6 has-text-start mt-4 mb-5'>
			<p>In this screen you can enrich your page with additional details and features. Those you choose will appear in the preview of the page.</p>
			<p className='mt-3'>In the preview - buttons and fields on your page will be inactive. In the live view - all these will work once the page is published.</p>
		</div>
		<p className='has-text-weight-bold'>Much of luck!</p>
	</>;
}

function BuyingDomainUnavailable({ goToExistingDomainPanel }) {
	return <>
		<p>At this stage it is not possible to purchase a domain through the system.</p>
		<p>We recommend purchasing your domain through <OutboundLink href="https://www.namecheap.com/">Namecheap</OutboundLink>.</p>
		<p>After you purchase your domain you can continue with the instructions in the <a onClick={goToExistingDomainPanel}>{i18n.Editor.AttachDomain.use_existing_domain}</a> tab.</p>
		<AttachDomainContactUs />
	</>;
}

function AttachDomainContactUs({ className }) {
	return <p className={className}>Feel free to <OutboundLink href="mailto:hello@yesh.li">contact us</OutboundLink> if you need help with the process.</p>;
}

function ModerationInvalidatedModal() {
	return <>
		<p>The system detected inappropriate content in the image. One of the following types of content was detected: adult content, forgery, medical imagery, violent or provocative content.</p>
		<br />
		<OutboundLink href="mailto:hello@yesh.li">Contact us if this is a misidentification.</OutboundLink>
	</>;
}

function DomainAttachedSuccessFullyModal ({ domain }) {
	return <>
		Great. The domain will be connected within 48 hours.<br />After that - content management will be accessible at <OutboundLink href={`https://${domain}/editor`}>{domain}/editor</OutboundLink>.<br /><br />See you there!
	</>;
}
function FatalErrorModal({ error }) {
	return <>
		<div className='block content has-text-start mt-5'>
			<p>We&apos;ve encountered a system error.<br />The error has been sent to the system for review and will be fixed as soon as possible.</p>
			<p>Meanwhile, you can try to refresh the page and try again. If the error persists - it&apos;s recommended to contact support.</p>
		</div>

		<div className='buttons has-addons is-centered'>
			<button className='button' onClick={() => window.location.reload()}>Refresh the page</button>
			<OutboundLink className='button' href={`mailto:hello@yesh.li?subject=System error in YeshLi&body=I encountered this error:%0D%0A%0D%0A${error.stack.replaceAll('\n', '%0D%0A')}`}>Contact support</OutboundLink>
		</div>
	</>;
}

function Four0FourSubtitle() {
	const goBack = () => window.history.goBack();
	return <p><span className="is-clickable" onClick={goBack}>Go back</span> or <a href="/">go back home</a> to proceed.</p>;
}