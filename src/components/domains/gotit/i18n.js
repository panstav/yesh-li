import OutboundLink from "@elements/OutboundLink";

export default {

	multi: {
		Logo: (props) => <span {...props}>got.it</span>,
		FatalErrorModal
	},

	Login: {
		session_over_please_reconnect: "Your session has expired - please reconnect",
		connect: "Connect",
		email_registered_with: "The email address that you required with",
		remember_me: "Remember me",
		why_remember_me: "Stay connected with this device for a longer period of time",
		SendLoginLinkButtonText: ({ isTried }) => <>Send {isTried ? 'another ' : ''}login link</>,
		link_successfully_sent_to: "Got it! Login link successfully sent to ",
	},

	Editor: {

		New_Page_Modal,

		fieldLabels: {
			full_name: 'Full name',
			occupation: 'Main occupation',
			occupation_description: 'Your job function or title dedicated to this page.',
			short_description: 'Short description',
			description_description: 'A more detailed description of your activity.',
			about: 'About',
			statement: 'Key statement',
			statement_description: '"I believe" statement or inspiring quote for your activity.',
			main_color: 'Main color',
			main_image: "Main image",
			main_image_description: "Appears when sharing the page on social networks, WhatsApp, etc.",
			alt_description: 'Not visible, intended for screen readers and organic search engine optimization.',

			select_label: 'Choose from the list',
			choose_service_button: "Text on the service selection button",
			choose_service_button_help: 'Choose a word for the action of engaging with this service, such as "Order" or "Register".',

			required_field: 'Required field',
			minLengthField: (minLength) => minLength === 1 ? '1 character minimum' : `At least ${minLength} characters`,
			maxLengthField: (maxLength) => `Maximum ${maxLength} characters`,

			invalid_url: 'Invalid URL',
			invalid_phone_number: 'Invalid phone number',
			invalid_email: 'Invalid email address',
			errors_are_red: "Page editing issues are displayed in red",
			page_successfully_saved: "The page was successfully saved!",
			page_failed_saving: "An error occurred while saving the page. The information might be saved but the page won't update - contact us soon",

			design: 'Design',
			connections: 'Connections',
			media: 'Media',
			faq: 'FAQ',
			question_and_answer: "Question and answer",
			question: 'Question',
			answer: 'Answer',
			submit: 'Save',

			urlMissingOn: (includes) => `The URL must contain "${includes}"`,

			minItemsRepeater: (minItems) => minItems === 1 ? '1 item minimum' : `At least ${minItems} items`,
			maxItemsRepeater: (maxItems) => `Maximum ${maxItems} items`,
			move_up: "Move up",
			move_down: "Move down",
			remove: "Remove",
			addItem: (singleName) => `Add ${singleName}`,

			image: "Image",
			image_types_supported: "Image types supported here",
			image_alt: "Image alt-text",
			click_to_choose_image: 'Click to choose an image',
			click_to_change_image: 'Click to change the image',
			set_image_focus: 'Set image focus',
			ModerationInvalidatedModal,
			image_upload_error: 'An error occurred while uploading the image. Try again later.',

			youtube_url: "YouTube video URL",
			video_title: "Video title",
			services: 'Services',
			service: 'Service',
			new_service_title: "New service title",
			new_service_description: "New service description",
			image_beside_service: "Image beside service",
			service_cta: "Text on the button beside the service",
			service_cta_description: "A call to action that will lead to receiving the service.",
			order_cta: 'Order',

			contact_form: 'Contact form',
			contact_form_title: 'Contact form title',
			contact_form_cta: 'A call to action that will submit the form',
			contact_form_cta_description: 'Text on the button that will submit the form',

			facebook: 'Facebook',
			instagram: 'Instagram',
			linkedin: 'LinkedIn',
			twitter: 'Twitter',
			pinterest: 'Pinterest',
			youtube: 'YouTube',
			tiktok: 'TikTok',
			whatsapp: 'WhatsApp',
			phone: 'Phone',
			email: 'Email',

			title: "Title",
			description: "Description",
			invitation: "Invitation",
			color: "Color",

			blue: "Blue",
			green: "Green",
			yellow: "Yellow",
			red: "Red",
			purple: "Purple"
		},

		Header: {
			my_leads_sheet: "My leads sheet",
			slug_updated_successfully: "The site address has been updated, it will be accessible within an hour.",
			log_out: "Log out",
			publish_site: "Publish site",
			choose_slug: "Set your address",
			choose_domain: "Connect domain",
			go_to_site: "Go to site",
			email_verified_successfully: "Email address verified successfully.",
		},

		Preview: {
			no_preview_while_invalid: "The preview is not updating when there are issues with the page's form"
		},

		TrialNotice: {
			page_is_temporary: "This page is temporary",
			signup_to_keep: "Sign up now to keep it",
			registration: "Registration",
			email_validation_instruction: "When you click on 'Continue', the system will send an email with a one-time code that will help us verify that the email address is valid and that you have access to it. With this email address, you will be able to log back in  without the need of another password.",
			upgrades_updates_consent: "I would like to receive updates about upgrades and new features",
			products_services_updates_consent: "I would like to receive updates about promotions and related services",
			validation: "Validation",
			code_you_received: "The code you received by email",
			validation_error_try_again: "An error occurred while validating the email address - try again later"
		},

		AttachSlug: {
			title: "Set your site address",
			valid_slug_requirements: "The site address can only contain English letters, numbers, and dashes.",
			submit_label: "Save",
			address_unavailable: "This address is unavailable."
		},

		AttachDomain: {

			attach_domain_to_site: "Connect a domain to your site",
			use_existing_domain: "Use an existing domain",
			buy_new_domain: "Buy a new domain",
			BuyingDomainUnavailable,
			attaching_domain_wait_or_come_later: "The system is preparing the site to connect your domain. This action may take a few minutes, you can wait for it to finish or you close the tab and come back here later.",
			site_ready_for_domain: "The site is ready to be connected to the domain.",
			set_nameservers_to_complete: "Set the name servers below with your domain provider to complete the connection.",
			required_nameservers: "Required name servers",
			current_nameservers: "Current name servers",
			no_nameservers_found: "No name servers found.",
			domain_url: "Domain URL",
			domain_url_pattern_error: 'The URL can only contain English letters, numbers, and dashes.',
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

function New_Page_Modal() {
	return <>
		<p>Your page is ready!</p>
		<div className='is-size-6 has-text-start mt-4 mb-5'>
			<p>On this screen you can enrich your page with additional details and features. Those you choose will appear in the page&apos;s preview.</p>
			<p className='mt-3'>In the preview - buttons and certain fields on your page will be inactive. When - all of these will be active once the page is published.</p>
		</div>
		<p className='has-text-weight-bold'>Much of luck!</p>
	</>;
}

function BuyingDomainUnavailable({ goToExistingDomainPanel }) {
	return <>
		<p>At this stage, it is not possible to purchase a domain with Got.it.</p>
		<p>We recommend purchasing your domain through <OutboundLink href="https://www.namecheap.com/">Namecheap</OutboundLink>. After purchasing your domain, you can continue with the instructions on the <a onClick={goToExistingDomainPanel}>Connect Existing Domain</a> tab.</p>
	</>;
}

function AttachDomainContactUs({ className }) {
	return <p className={className}>Feel free to <OutboundLink href="mailto:hello@got.it">contact us</OutboundLink> if you ever need any help with this.</p>;
}

function ModerationInvalidatedModal() {
	return <><p>The system has detected in the image some inappropriate content of one of the following types: adult content, forgery, medical imagery, violent or provocative content.</p><br /><OutboundLink href="mailto:hello@got.it">Contact us if this is a misidentification.</OutboundLink></>;
}

function DomainAttachedSuccessFullyModal({ domain }) {
	return <>
		Great, your domain is being connected and will be fully accessible within the next 48 hours.<br />Then the editor page will be available at <OutboundLink href={`https://${domain}/editor`}>{domain}/editor</OutboundLink>.<br /><br />See you there!
	</>;
}

function FatalErrorModal ({ error }) {
	return <>
		<div className='block content has-text-start mt-5'>
			<p>נתקלנו בשגיאת מערכת.<br />השגיאה שוגרה למערכת לבדיקה ותתוקן בהקדם האפשרי.</p>
			<p>ניתן לנסות לרענן את הדף ולנסות שוב. אם השגיאה חוזרת - כדאי לפנות לתמיכה.</p>
		</div>

		<div className='buttons has-addons is-centered'>
			<button className='button' onClick={() => window.location.reload()}>לרענן את הדף</button>
			<OutboundLink className='button' href={`mailto:hello@$yesh.li?subject=שגיאת מערכת ב-יש.לי&body=נתקלתי בשגיאה הזו:%0D%0A%0D%0A${error.stack.replaceAll('\n', '%0D%0A')}`}>לפנות לתמיכה</OutboundLink>
		</div>
	</>;
}