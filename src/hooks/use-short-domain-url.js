import { graphql, useStaticQuery } from "gatsby";

export default function useShortDomainUrl() {
	const { site: { siteMetadata: { siteUrl } } } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`);
	return new URL(siteUrl).hostname;
}