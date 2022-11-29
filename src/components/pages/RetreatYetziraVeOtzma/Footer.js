export default function Footer() {
	return <footer className="mt-6 has-text-centered">
		<span>כל הזכויות שמורות לשילה אורינגר ו</span>
		<a href="https://kibbutz-samar.com/he" target="_blank" rel="noopener noreferrer">קיבוץ סמר</a>
		<span> © {new Date().getFullYear()}</span>
	</footer>;
}