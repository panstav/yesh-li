import { HeadFor } from "@config/Meta";
import Page from "@themes/Elyse-01";

export const Head = HeadFor(({ pageContext: { content: { fullName, description, occupation, portrait: { srcSet } } } }) => {
	return { title: `${occupation} • ${fullName}`, description, featuredImage: srcSet };
});

export default function Elyse_01({ pageContext: { content } }) {
	return Page({ content });
}