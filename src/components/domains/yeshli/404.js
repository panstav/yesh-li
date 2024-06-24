import { wrapPage } from "@domains/yeshli";
import useI18n from "@hooks/use-i18n";

export default wrapPage(Four0Four);

function Four0Four() {
	const [{ multi: { four_0_four_title, Four0FourSubtitle } }] = useI18n();

	return <div className="is-flex is-flex-direction-column" style={{ height: '100vh' }}>

		<h1>{four_0_four_title}</h1>
		<Four0FourSubtitle />

	</div>;
}