import { graphql, useStaticQuery } from "gatsby";

export default function Footer () {

	const { site: { siteMetadata: { version } } } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					version
				}
			}
		}
	`);

	return <footer className='footer is-flex is-justify-content-space-between has-text-grey-light is-size-7 pt-3 px-1 pb-4 mx-3'>
		<div>
			<span>© {new Date().getFullYear()} יש.לי</span>
		</div>
		<div className='is-flex is-flex-gap-3'>
			<span>גרסה: {version}</span>
			<a href="mailto:hello@yesh.li" target='_blank' rel='noreferrer'>נשמח לכל משוב</a>
		</div>
	</footer>;
}