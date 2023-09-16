import { graphql } from "gatsby";

import { HeadFor } from "@config/Meta";
import Page from "@pages/Elyse-01";

export default function Elyse_01({ data: { themeElyse01Json: { content } } }) {
	return <Page content={content} />;
}

export const Head = HeadFor(({ data: { themeElyse01Json } }) => {
	const { slug, content: { fullName, occupation, portrait: { srcSet } } } = themeElyse01Json;
	return { pageId: slug, title: `${occupation} • ${fullName}`, featuredImage: srcSet };
});

export const query = graphql`
	query ($slug: String) {
		themeElyse01Json (slug: { eq: $slug }) {
			content {
        mainColor
        description
        fullName
        occupation
        statement
        ctaHeader
				submitText
        portrait {
          alt
          srcSet
          position
        }
        sections {
          anchor
          color
          content
          image {
            alt
            srcSet
            position
          }
          label
          ctaText
        }
        socials {
          facebook
          instagram
          linkedin
          youtube
          twitter
          pinterest
          tiktok
          whatsapp
          email
          phone
        }
      }
		}
	}
`;