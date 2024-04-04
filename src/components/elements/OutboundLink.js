export default function OutboundLink({ children, ...props }) {
	return <a {...props} target="_blank" rel="noopener noreferrer">{children}</a>;
}