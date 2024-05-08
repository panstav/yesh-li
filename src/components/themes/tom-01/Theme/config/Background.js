export default function Background() {
	return <div style={{
		zIndex: '-10',
		position: 'fixed',
		top: '-50%',
		left: '-50%',
		width: '200%',
		height: '200%',
		backgroundImage: 'url(https://tombezrukov.com/static/background-01-ee7e68e94b7be12fbc044ec0ef34ce8f.jpg)',
	}} />;
}