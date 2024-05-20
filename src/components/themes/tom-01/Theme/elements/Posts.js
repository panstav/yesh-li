import classNames from "classnames";

import Section from "@wrappers/Section";

import SignupForUpdates from "@themes/tom-01/Theme/elements/SignupForBlog";
import Delimiter from "@themes/tom-01/Theme/elements/Delimiter";

import { useSiteContent } from "@hooks/use-site-data";

import { singlePost } from "@themes/tom-01/Theme/index.module.sass";

export default function Posts() {
	const { collectionPages: { post: posts, tag: availableTags } } = useSiteContent();

	posts.forEach((post) => {
		const contentText = post.contentHtml.replace(/<[^>]*>/g, '');
		const excerpt = contentText.substring(0, 300);
		post.excerpt = excerpt + (excerpt < contentText ? '...' : '');
	});

	// only show tags that have posts associated with them
	const usedTags = availableTags.filter(tag => posts.some(post => post.tags?.find((postTag) => postTag.title === tag.title)));

	const singlePostClassName = classNames('gap-4 mb-6 pb-6', singlePost);

	return <Section noTopMargin className="is-flex-desktop is-flex-direction-row-reverse is-align-items-start gap-6">
		<div className="is-flex gap-6">
			<Delimiter isVertical className="is-hidden-touch" />
			<div className="is-flex-tablet-only gap-6" style={{ width: '100%', minWidth: '20ch' }}>
				<SignupForUpdates className="mb-4" />
				<div>
					<h3 className="mb-2" style={{ textDecoration: 'underline' }}>Tags:</h3>
					<ul className="tags">
						{usedTags.map(({ title, slug }) => {
							return <li key={slug} className="tag is-medium">
								<a href={`/blog/tag/${slug}`}>{title}</a>
							</li>;
						})}
					</ul>
				</div>
			</div>
		</div>
		<Delimiter className="is-hidden-desktop mt-5 mb-6" />
		<ol className="is-flex-grow-1">
			{posts.map(({ slug, title, publishDate, excerpt, featuredImage: { position, ...featuredImage } }) => {
				return <li key={slug} className={singlePostClassName}>
					<div className="is-flex-grow-1 reset-anchors">
						<a href={`/blog/${slug}`} className="is-block has-text-black mb-2">
							<h2 className='is-size-4'>{title}</h2>
							<span className="is-size-7 has-text-weight-bold">{publishDate}</span>
							<div>{excerpt}</div>
						</a>
					</div>
					<a href={`/blog/${slug}`} className="is-flex-shrink-0">
						<img {...featuredImage} className="object-fit-cover is-block mx-auto" style={{ maxWidth: '300px', objectPosition: position, aspectRatio: '1/1' }} />
					</a>
				</li>;
			})}
		</ol>
	</Section>;
}