import OutboundLink from "@elements/OutboundLink";

import YeshLiLogo from "@domains/yeshli/elements/Logo";

const remember_me = "זכור אותי";

const i18n = {

	multi: {
		Logo: YeshLiLogo,
		FatalErrorModal,
		four_0_four_title: 'העמוד לא נמצא',
		Four0FourSubtitle
	},

	Login: {
		session_over_please_reconnect: `הסשן שלך הסתיים - אפשר לבחור ב-"${remember_me}" בשביל משך סשן ארוך יותר`,
		connect: "התחברות",
		email_registered_with: "כתובת המייל שנרשמת איתה",
		remember_me,
		why_remember_me: "סמנו על מנת להשאר מחוברים לזמן רב יותר",
		SendLoginLinkButtonText: ({ isTried }) => <>שלח לי {isTried ? 'עוד ' : ''}לינק התחברות</>,
		link_successfully_sent_to: "לינק וקוד לאימות נשלחו אלייך למייל",
		validation: "אימות",
		code_you_received: "הקוד שקיבלת למייל",
		email_address_verification: "אימות כתובת מייל",
		digitsOnlyWhileYouPasted: (badPaste) => `הקוד יכיל ספרות בלבד. ניסית להדביק: '${badPaste}'`,
		bad_verification_code: "קוד האימות שגוי",
	},

	Editor: {

		NewPageModal,

		fieldLabels: {
			full_name: 'שם מלא',
			occupation: 'עיסוק ראשי',
			occupation_description: 'ה-"טייטל" שלך או כותרת למכלול העשייה לה מוקדש עמוד זה.',
			short_description: 'תיאור קצר',
			description_description: 'תיאור קצת יותר מפורט של מכלול העשייה שלך.',
			about: 'אודות',
			statement: 'משפט מפתח',
			statement_description: 'הצהרת "אני מאמין" או ציטוט שנותן השראה לעשייה שלך.',
			main_color: 'צבע ראשי',
			main_image: "תמונה ראשית",
			main_image_description: "תופיע גם כשמשתפים את העמוד ברשתות חברתיות, וואטסאפ וכו'.",
			alt_description: 'לא יופיע חזותית, מיועד לצרכי הנגשה ע"י מקריאי מסך וקידום אורגני ע"י מנועי חיפוש.',
			author: 'מחבר',
			quote_can_have_author: 'אם בחרת בציטוט למשפט המפתח, אפשר לציין כאן את שם המצוטט.',

			select_label: 'ביחרו מהרשימה',
			choose_service_button: "טקסט בכפתור הבחירה בשירות",
			choose_service_button_help: 'ביחרו מילה לפעולה שלאחריה ניתן יהיה להנות מהשירות, למשל "הזמנה" או "הרשמה".',
			required_field: 'שדה חובה',
			minLengthField: (minLength) => minLength === 1 ? 'מינימום תו 1' : `מינימום ${minLength} תווים`,
			maxLengthField: (maxLength) => `מקסימום ${maxLength} תווים`,

			invalid_url: 'כתובת האינטרנט לא תקינה',
			invalid_relative_url: 'כתובת אינטרנט יחסית לא תקינה',
			invalid_phone_number: 'מספר הטלפון אינו תקין',
			invalid_email: 'כתובת האימייל אינה תקינה',
			errors_are_red: "בעיות בעריכת העמוד מוצגות באדום",
			page_successfully_saved: "העמוד נשמר בהצלחה!",
			page_failed_saving: "אירעה שגיאה בעת שמירת העמוד. העמוד לא התעדכן - צרו עימנו קשר בהקדם",

			design: 'עיצוב',
			connections: 'קישורים',
			media: 'מדיה',
			faq: 'שאלות נפוצות',
			question_and_answer: "שאלה ותשובה",
			question: 'שאלה',
			answer: 'תשובה',
			submit: 'לשמור',

			urlMissingOn: (includes) => `הכתובת צריכה להכיל "${includes}"`,
			country_phone_code: '+972',

			minItemsRepeater: (minItems) => minItems === 1 ? 'לפחות פריט 1' : `לפחות ${minItems} פריטים`,
			maxItemsRepeater: (maxItems) => `מקסימום ${maxItems} פריטים`,
			go_to_page: "לעבור לעמוד",
			move_up: "לדחוף מעלה",
			move_down: "לדחוף מטה",
			remove: "להסיר",
			addItem: (singleName) => `להוסיף ${singleName}`,

			image: "תמונה",
			image_types_supported: "סוגי הקבצים שנתמכים כאן",
			image_alt: "טקסט חלופי לתמונה",
			click_to_choose_image: 'לחצו לבחירת התמונה',
			click_to_change_image: 'ליחצו להחלפת התמונה',
			set_image_focus: 'בחירת פוקוס לתמונה',
			ModerationInvalidatedModal,
			ExtensionMatchesFileDoesNot,
			image_upload_error: 'אירעה שגיאה בהעלאת התמונה. נסו שנית מאוחר יותר',

			youtube_url: "כתובת סרטון יוטיוב",
			video_title: "כותרת לסרטון",
			services: 'שירותים',
			service: 'שירות',
			new_service_title: 'כותרת השירות החדש',
			new_service_description: 'תיאור השירות החדש',
			image_beside_service: "תמונה לצד השירות",
			service_cta: "טקסט על הכפתור שלצד השירות",
			service_cta_description: "קריאה לפעולה שתביא לקבלת השירות.",
			order_cta: 'להזמנה',

			contact_from: 'טופס הפניות',
			contact_form_title: "כותרת מעל טופס הפניות",
			contact_form_cta: "טקסט על כפתור שליחת הטופס",
			contact_form_cta_description: "המילים שיופיעו על גבי כפתור שבלחיצה עליו נשלח טופס הפניות.",

			facebook: 'פייסבוק',
			instagram: 'אינסטגרם',
			linkedin: 'לינקדאין',
			twitter: 'טוויטר',
			pinterest: 'פינטרסט',
			youtube: 'יוטיוב',
			tiktok: 'טיקטוק',
			whatsapp: 'וואטסאפ',
			phone: 'טלפון',
			email: 'אימייל',

			title: 'כותרת',
			description: 'תיאור',
			invitation: 'הזמנה',
			color: "צבע",

			blue: "כחול",
			green: "ירוק",
			yellow: "צהוב",
			red: "אדום",
			purple: "סגול"
		},

		Header: {
			my_leads_sheet: "גיליון הפניות שלי",
			slug_updated_successfully: "כתובת האתר עודכנה, תוך פחות משעה העמוד שלך יהיה נגיש.",
			log_out: "יציאה",
			publish_site: "הוצאה לאור",
			choose_slug: "בחירת כתובת",
			choose_domain: "חיבור דומיין",
			go_to_site: "מעבר לעמוד",
			email_verified_successfully: "כתובת המייל אומתה בהצלחה.",
		},

		Preview: {
			no_preview_while_invalid: "התצוגה המקדימה אינה מתעדכנת כאשר יש בעיות בעריכת העמוד"
		},

		TrialNotice: {
			page_is_temporary: "העמוד זמני",
			signup_to_keep: "הרשמו כעת כדי לשמור עליו",
			registration: "הרשמה",
			email_validation_instruction: "כשתלחצו על 'המשך' המערכת תשלח מייל שיעזור לנו לאמת שכתובת המייל תקינה ושיש לך גישה אליה. עם כתובת מייל זו אפשר יהיה להתחבר למערכת גם ללא צורך בסיסמה.",
			link_successfully_sent_to: "המייל נשלח בהצלחה ל-",
			upgrades_updates_consent: "אשמח לקבל עידכונים על שידרוגים ופיצ'רים חדשים",
			products_services_updates_consent: "אשמח לקבל עידכונים על מבצעים ושירותים נלווים"
		},

		AttachSlug: {
			title: "כתובת קבועה לעמוד",
			valid_slug_requirements: "כתובת העמוד יכולה להכיל אותיות באנגלית, ספרות ומקפים בלבד.",
			submit_label: "שמור",
			address_unavailable: "כתובת זו אינה זמינה."
		},

		AttachDomain: {

			attach_domain_to_site: "חיבור דומיין לאתר",
			use_existing_domain: "חיבור לדומיין קיים",
			buy_new_domain: "רכישת דומיין חדש",
			BuyingDomainUnavailable,
			attaching_domain_wait_or_come_later: "המערכת מכינה את האתר לחיבור הדומיין. פעולה זו עשויה להמשך מספר דקות, אפשר לחכות שתסתיים ואפשר גם לסגור את העמוד ולחזור לכאן מאוחר יותר.",
			site_ready_for_domain: "המערכת מוכנה לחבר את הדומיין שלך.",
			set_nameservers_to_complete: "על מנת להשלים את החיבור יש להגדיר את שמות השרת (Name Servers) הבאים מול הספק עימו רשמתם את הדומיין.",
			required_nameservers: "שמות השרת הרצויים",
			current_nameservers: "שמות השרת המצויים",
			no_nameservers_found: "טרם נרשמו שמות שרת בדומיין זה.",
			domain_url: "כתובת הדומיין",
			domain_url_pattern_error: 'הכתובת יכולה להכיל אותיות באנגלית, ספרות ומקפים בלבד.',
			ContactUs: AttachDomainContactUs,
			DomainAttachedSuccessFullyModal

		}
	},

	misc: {
		email_address: "כתובת אימייל",
		last_update: "עידכון אחרון",
		continue: "המשך",
	}

};

export default i18n;

function ExtensionMatchesFileDoesNot({ allowedTypes }) {
	return <>
		<p>{i18n.Editor.fieldLabels.image_types_supported}: <span style={{ direction: 'ltr', display: 'inline-block' }}>{allowedTypes}</span></p>
		<p>לקובץ שבחרת יש סיומת שנתמכת אך הקובץ עצמו מסוג אחר.</p>
	</>;
}

function NewPageModal() {
	return <>
		<p>העמוד שלך מוכן!</p>
		<div className='is-size-6 has-text-start mt-4 mb-5'>
			<p>במסך זה אפשר להעשיר את העמוד שלך בפרטים ומאפיינים נוספים. אלה שתבחרו יופיעו בתצוגה המקדימה של העמוד.</p>
			<p className='mt-3'>בתצוגה המקדימה - כפתורים ושדות מסויימים בעמוד שלך יהיו בלתי פעילים. בתצוגה למבקרים - כל אלה יפעלו כשורה אחרי שהעמוד ייצא לאור.</p>
		</div>
		<p className='has-text-weight-bold'>המון הצלחה!</p>
	</>;
}

function BuyingDomainUnavailable({ goToExistingDomainPanel }) {
	return <>
		<p>בשלב זה אין אפשרות לרכוש דומיין דרך המערכת.</p>
		<p>אנו ממליצים לרכוש את הדומיין שלכם דרך <OutboundLink href="https://domains.livedns.co.il/">LiveDNS</OutboundLink> במידה ואתם רוצים סיומת ישראלית ודרך <OutboundLink href="https://www.namecheap.com/">Namecheap</OutboundLink> עבור כל סיומת אחרת.</p>
		<p>לאחר שתרכשו את הדומיין שלכם תוכלו להמשיך עם ההוראות שבלשונית <a onClick={goToExistingDomainPanel}>{i18n.Editor.AttachDomain.use_existing_domain}</a>.</p>
		<AttachDomainContactUs />
	</>;
}

function AttachDomainContactUs({ className }) {
	return <p className={className}>תרגישו חופשי <OutboundLink href="mailto:hello@yesh.li">ליצור איתנו קשר</OutboundLink> אם תצטרכו עזרה בתהליך.</p>;
}

function ModerationInvalidatedModal() {
	return <>
		<p>המערכת זיהתה בתמונה תוכן בלתי מתאים מאחד הסוגים הבאים: תוכן למבוגרים, זיוף, דימוי רפואי, תוכן אלים או פרובוקטיבי.</p>
		<br />
		<OutboundLink href="mailto:hello@yesh.li">צרו קשר אם מדובר בטעות בזיהוי.</OutboundLink>
	</>;
}

function DomainAttachedSuccessFullyModal ({ domain }) {
	return <>
		מעולה. הדומיין יחובר תוך פחות מ-48 שעות.<br />לאחר מכן - ניהול התוכן יהיה נגיש בכתובת <OutboundLink href={`https://${domain}/editor`}>{domain}/editor</OutboundLink>.<br /><br />נתראה שם!
	</>;
}
function FatalErrorModal({ error }) {
	return <>
		<div className='block content has-text-start mt-5'>
			<p>נתקלנו בשגיאת מערכת.<br />השגיאה שוגרה למערכת לבדיקה ותתוקן בהקדם האפשרי.</p>
			<p>ניתן לנסות לרענן את הדף ולנסות שוב. אם השגיאה חוזרת - כדאי לפנות לתמיכה.</p>
		</div>

		<div className='buttons has-addons is-centered'>
			<button className='button' onClick={() => window.location.reload()}>לרענן את הדף</button>
			<OutboundLink className='button' href={`mailto:hello@yesh.li?subject=שגיאת מערכת ב-יש.לי&body=נתקלתי בשגיאה הזו:%0D%0A%0D%0A${error.stack.replaceAll('\n', '%0D%0A')}`}>לפנות לתמיכה</OutboundLink>
		</div>
	</>;
}

function Four0FourSubtitle() {
	const goBack = () => window.history.goBack();
	return <p><span className="is-clickable" onClick={goBack}>חזרו אחורה</span> או <a href="/">לעמוד הבית</a> בכדי להמשיך.</p>;
}