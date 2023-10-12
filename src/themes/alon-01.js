import { HeadFor } from "@config/Meta";
import Page from "@themes/Alon-01";

export const Head = HeadFor(({ pageContext: { content: { fullName, description, occupation, featuredImage } } }) => {
	return { title: `${occupation} • ${fullName}`, description, featuredImage };
});

export default function Alon_01({ pageContext: { content } }) {
	return Page({ content });
}