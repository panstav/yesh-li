export default function LastUpdated({ date }) {

	// turn date obj into exactly the following format: 29/01/23
	const formattedDate = date.toLocaleDateString('he-IL', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit'
	}).replace(/\./g, '/');

	return <p className="help mb-5">
		<span className="has-text-grey-light">
			עידכון אחרון:
		</span> {formattedDate}
	</p>;
}