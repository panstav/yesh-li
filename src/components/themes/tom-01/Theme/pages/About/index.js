import classNames from 'classnames';

import { usePageContent } from '@hooks/use-site-data';

import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import SmallSection from "@themes/tom-01/Theme/elements/SmallSection";

export default function AboutPage() {

	const { title, subtitle, contentHtml, featuredImage, featuredImageIsVertical } = usePageContent('about');

	const profileClassName = classNames('mb-3', featuredImageIsVertical && 'mr-5');
	const profileStyle = featuredImageIsVertical ? { float: 'left' } : { width: '100%' };

	return <>
		<PageHeader {...{ title, subtitle }} />
		<SmallSection noTopMargin>
			<div className="content">

				{featuredImage && <img
					srcSet={featuredImage.srcSet}
					alt={featuredImage.alt || `${title} - ${subtitle}`}
					className={profileClassName}
					style={profileStyle} />}

				<div className="content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
			</div>
		</SmallSection>
	</>;
}