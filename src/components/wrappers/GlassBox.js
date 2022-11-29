export default function GlassBox({ children }) {
	return <div className="box" style={{ backgroundColor: 'rgb(255 255 255 / 70%)' }}>
		{children}
	</div>;
}