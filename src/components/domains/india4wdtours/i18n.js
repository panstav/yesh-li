import Icon from "@elements/Icon/Icon";
import OutboundLink from "@elements/OutboundLink";

// import YeshLiLogo from "@domains/yeshli/elements/Logo";
import regexes from "@lib/regexes";

const i18n = {

	multi: {
		Logo: FakeLogo,
		FatalErrorModal
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
		email_address_verification: "Continue",
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
		<p>After you purchase your domain you can continue with the instructions in the <a onClick={goToExistingDomainPanel}>Use Existing Domain</a> tab.</p>
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

function FakeLogo() {
	return <Icon viewBox="0 0 1115 333" style={{ width: '8rem' }}>
		<path fill="#000201" d="M485 221h-8V108h19v33c0 4 1 5 5 4h47c4 0 5-1 5-4a904 904 0 0 1 0-33h11c7 0 7 0 8 8l-1 43c0 4-1 5-5 5h-64c-5 0-6 1-6 6v51h-11z" /><path fill="#040505" d="M295 108h4c7 0 7 0 7 8v93c0 12 0 12-11 12h-8v-49c0-4 2-8-4-8l-45 1a243 243 0 0 0-7-1v-14c-1-4 1-5 5-5h51v-37h8z" /><path fill="#050505" d="M863 108h11v132h-19V108h8z" /><path fill="#040404" d="M352 240h-8V108h19v120c0 12 0 12-11 12z" /><path fill="#000201" d="M807 108h11v120c0 12 0 12-12 12h-7V108h8z" /><path fill="#020202" d="M750 240h-8V108h19v120c0 12 0 12-11 12z" /><path fill="#010202" d="M428 240h-8V108h12c7 0 7 0 7 8v112c0 12 0 12-11 12z" /><path fill="#010403" d="M617 221h-7V108h18l1 8a4587 4587 0 0 0 0 105h-12z" /><path fill="#038C6E" d="M496 221v-51c0-5 1-6 6-6h64c4 0 5-1 5-5l1-43c7 0 7 0 7 7v44c0 4-1 5-5 5h-65c-4 0-5 1-5 6v42l-1 1h-7z" /><path fill="#0B9376" d="M806 241c12-1 12-1 12-13V116h8v125l-1 7h-18l-1-7z" /><path fill="#048C6F" d="M750 241c11-1 11-1 11-13l1-112h7v126c0 5-1 7-6 6h-13v-7z" /><path fill="#02896C" d="M352 241c11-1 11-1 11-13l1-112h7v128c0 3-1 4-4 4h-15v-7zm511 0 11-1 1-124h7v132h-16c-5 0-2-4-3-7z" /><path fill="#0A9174" d="M428 241c11-1 11-1 11-13V116c8 0 8-2 8 7v116c0 11 1 9-9 9h-10v-7z" /><path fill="#060707" d="m106 165-8-1a26622 26622 0 0 1 0-19h49c8 0 8 0 8 9v10h-33l-16 1z" /><path fill="#000201" d="M219 221h-7v-57h19v9a8908 8908 0 0 0 0 48h-12z" /><path fill="#030404" d="M98 108V93c0-3 1-4 4-4h49c5 0 3 4 4 8v11a8538 8538 0 0 1-57 0zm265 0V95c0-5 2-6 6-6h44c7 0 7 0 7 8v11a9784 9784 0 0 1-57 0z" /><path fill="#040505" d="M496 221h56l1 9v2c0 8 0 8-8 8h-49v-11a5116 5116 0 0 0 0-8zm-390 0h47l2 8v4c0 7 0 7-7 7H98v-19h8z" /><path fill="#020202" d="M496 108V93l2-4h54v8l1 11h-50a389 389 0 0 0-7 0z" /><path fill="#030404" d="M988 221v-57h7l12 1v44c0 12 0 12-11 12h-8z" /><path fill="#010403" d="m162 164 5 1h7a482 482 0 0 0 0 45c0 11 0 11-11 11h-1l-7-1v-56h7z" /><path fill="#020202" d="m931 108 1-14c-1-4 1-5 4-5h45c7 0 7 0 7 8a1769 1769 0 0 0 0 11h-57z" /><path fill="#030404" d="M636 240h-7v-19h56v19h-49zm-397 0h-8v-19h56a129 129 0 0 1 0 12c0 8 1 7-7 7h-41z" /><path fill="#020202" d="m628 108 1-15c-1-3 0-4 4-4h48c6 0 4 4 4 8a1849 1849 0 0 0 0 11 8860 8860 0 0 1-57 0z" /><path fill="#030404" d="M940 221h48v19h-56v-18l8-1z" /><path fill="#020202" d="M231 107V93c0-3 1-4 3-4h50c5 0 3 4 3 8v11h-55l-1-1z" /><path fill="#080C0B" d="M939 145h42l7 1v18a10522 10522 0 0 1-56 0v-17l1-2h6z" /><path fill="#028A6C" d="M295 221c11 0 11 0 11-12l1-93c7 0 7 0 7 7v100c0 5-1 7-6 6h-13v-8z" /><path fill="#080C0B" d="m933 146-1 1-12-1h-7v-38h19v33l1 5z" /><path fill="#008F70" d="m636 220-7 1a3296 3296 0 0 1 0-105h7v104z" /><path fill="#020202" d="M98 145v1H87c-8-1-8-1-8-9v-29h19v37z" /><path fill="#040505" d="M761 108V93c0-3 1-4 4-4h30c6 0 3 4 4 8v11a3938 3938 0 0 1-38 0z" /><path fill="#020202" d="M818 108V92l3-3h31c5 0 3 4 3 8v11h-37z" /><path fill="#0F9578" d="M163 221c11 0 11 0 11-11v-37c8-1 8-1 8 7v44c0 4-2 5-6 5h-13v-8z" /><path fill="#038C6E" d="m636 241 49-1 1-11h7v15c0 3 0 4-3 4h-52l-1-1-1-6zm303 0 49-1 1-11h7v15c0 3-1 4-3 4h-52l-1-1-1-6z" /><path fill="#068E71" d="M996 221c11 0 11 0 11-12v-37c8 0 8 0 8 8v42c0 7 0 7-7 7h-12v-8z" /><path fill="#048C6F" d="M163 229v15l-3 4h-54v-7l42-1c7 0 7 0 7-7v-3l1-1h7z" /><path fill="#028A6C" d="m239 241 41-1c8 0 7 1 7-7l1-4h7v19h-56v-7z" /><path fill="#038C6E" d="m504 241 41-1c8 0 8 0 8-8v-2h7v18h-56v-7z" /><path fill="#058F71" d="M636 108h49v8h-49v-8z" /><path fill="#03866A" d="M155 164v8h-49v-7l16-1h33z" /><path fill="#058F71" d="M106 108h48l1 8h-49v-8z" /><path fill="#03866A" d="m939 165 49-1v8h-48l-1-7z" /><path fill="#058F71" d="M371 108h49v8h-49v-8zm568 0h49v8h-49v-8z" /><path fill="#008F70" d="M238 108h49v7l-1 1h-47l-1-8z" /><path fill="#040505" d="m552 221 1-19h16c4 0 2 4 3 7 0 14 1 12-11 12h-9z" /><path fill="#010403" d="M920 221h-7v-19h18a254 254 0 0 0 0 19h-11z" /><path fill="#030404" d="M87 221h-8v-16l3-3h9c7 0 7 0 7 8v11H87z" /><path fill="#040505" d="M685 221v-15c0-3 1-4 5-4h8c6 0 6 0 6 7 0 12 0 12-11 12h-8z" /><path fill="#030404" d="M219 127h-7v-19h19v8c0 12 2 11-10 11h-2z" /><path fill="#040505" d="M155 116v-8h12c7 0 7 0 7 8 0 12 2 11-10 11h-2c-7 0-7 0-7-11z" /><path fill="#030404" d="M685 116v-8h12c7 0 7 0 7 8 0 11 0 11-10 11h-1c-8 0-8 0-8-11zm303 0v-8h12c7 0 7 0 7 8 0 11 0 11-10 11h-1c-8 0-8 0-8-11z" /><path fill="#0B9376" d="M560 221h1c12 0 11 2 11-11 7 0 7 0 7 7 0 12 0 12-11 12h-7l-1-8z" /><path fill="#0F9578" d="m219 128 2-1c12 0 10 1 10-11h8v14c0 4-2 5-5 5h-7c-7 0-7 0-8-7z" /><path fill="#0A9174" d="M693 221c11 0 11 0 11-11 8 0 8 0 8 8 0 12 1 11-10 11h-9v-8zm-531-93 2-1c12 0 10 1 10-11 8 0 8 0 8 7-1 14 1 12-12 12-7 0-7 0-8-7z" /><path fill="#058F71" d="M769 108h30v8h-30v-8z" /><path fill="#068E71" d="m996 128 1-1c10 0 10 0 10-11 8 0 8 0 8 8 0 13 1 11-11 11-8 0-8 0-8-7zm-303 0 1-1c10 0 10 0 10-11 8 0 8 0 8 8 0 13 1 11-11 11-8 0-8 0-8-7z" /><path fill="#058F71" d="M826 108h29v8h-29v-8z" /><path fill="#068E71" d="m98 145 1-29h7v29h-8z" /><path fill="#008F70" d="m933 145-1-4v-25h7v29h-6z" /><path fill="#1A8A72" d="M931 221v-11l2-1c5 0 7 2 6 7l1 5-8 1-1-1zm-302 0v8h-4c-8 0-8 0-8-7l12-1z" /><path fill="#0A9174" d="M231 221v8h-11l-1-7 12-1z" /><path fill="#0F9578" d="M931 221v1l1 7h-5c-8 0-7 0-7-7l11-1z" /><path fill="#1A8A72" d="m920 146 11 1 1 7h-5c-8 0-7 0-7-8z" /><path fill="#0F9578" d="M799 108V97h3c3-1 5 1 5 5v5l-8 1z" /><path fill="#048C6F" d="M98 221v-11c10 0 8-1 8 11h-8zm-11 1 11-1v8h-4c-8 0-7 1-7-7z" /><path fill="#028A6C" d="M496 221v8h-11v-7l11-1z" /><path fill="#0F9578" d="M87 146h11v7l-11 1v-8z" /><path fill="#048C6F" d="m996 107-8 1V97c9 0 8-1 8 10z" /><path fill="#068E71" d="M855 108V97c9 0 8-2 8 10l-8 1zm-568 0V97c9 0 8-2 8 10l-8 1z" /><path fill="#048C6F" d="m693 107-8 1V97c9 0 8-1 8 10z" /><path fill="#0F9578" d="m163 107-8 1V97c9 0 8 0 8 10z" /><path fill="#0A9174" d="M420 108V97c9 0 8 0 8 10l-8 1z" /><path fill="#008F70" d="M553 108V98c7-2 7-2 7 9l-7 1z" /><path fill="#02896C" d="M988 164v-10h7v10h-7z" /><path fill="#008F70" d="M162 164h-7v-10c8 0 7-2 7 10z" /><path fill="#030404" d="m231 107 1 1h-1v-1z" /><path fill="#EFF7F5" d="M505 221h-1v-1l1 1z" /><path fill="#0F9578" d="m286 116 1-1v1h-1z" /><path fill="#058F71" d="M553 116h-49v-7l1-1h48v8z" /><path fill="#1A8A72" d="M504 116v29h-3c-4 1-5 0-5-4l1-25h7z" /><path fill="#03866A" d="M287 172h-49l1-7 44-1c6 0 4 4 4 8z" /><path fill="#0F9578" d="m231 173 7-1h1v49h-8v-48z" /><path fill="#0F9578" d="M155 229h1l-1 1v-1z" /><path fill="#03866A" d="M504 109v-1h1l-1 1z" />
	</Icon>;
}