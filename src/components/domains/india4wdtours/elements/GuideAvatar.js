import FlexImage from "@elements/FlexImage";

export default function GuideAvatar({ style, ...props }) {
	return <FlexImage {...props} style={{ width: '80%', maxWidth: '12rem', height: 'auto', borderRadius: '100%', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 15px 0px', border: '5px solid white', ...style }} />;
}