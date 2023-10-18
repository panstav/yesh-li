import { HeadFor } from "@config/Meta";
import Page from "@themes/Elyse-01";

export const Head = HeadFor(({ pageContext: { content: { description, portrait: { srcSet } } } }) => {
	return {
		description,
		featuredImage: srcSet
	};
});

export default function Elyse_01({ pageContext: { mainColor, content } }) {
	return Page({ mainColor, content });
}