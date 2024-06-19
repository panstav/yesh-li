import OutboundLink from "@elements/OutboundLink";

export default function Footer() {
	return <footer className="mt-6 has-text-centered">
		<span>כל הזכויות שמורות לשילה אורינגר ו</span>
		<OutboundLink href="https://kibbutz-samar.com/he">קיבוץ סמר</OutboundLink>
		<span> © {new Date().getFullYear()}</span>
	</footer>;
}