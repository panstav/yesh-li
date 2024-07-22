import { useContext } from "react";
import classNames from "classnames";

import Modal, { useModal } from "@wrappers/Modal";

import RatingStars from "@domains/india4wdtours/elements/RatingStars";

import { borderColor } from "@domains/india4wdtours/lib/css";

import GuideContext from "./context";

const certificates = [
	{
		certificate: { src: "https://via.placeholder.com/700x400", alt: "Certificate" },
		caption: "Certificate of completion"
	},
	{
		certificate: { src: "https://via.placeholder.com/700x400", alt: "Certificate" },
		caption: "Tour guide certificate"
	},
	{
		certificate: { src: "https://via.placeholder.com/700x400", alt: "Certificate" },
		caption: "Certificate of completion"
	},
	{
		certificate: { src: "https://via.placeholder.com/700x400", alt: "Certificate" },
		caption: "Tour guide certificate"
	}
];

export default function Info() {
	const { rating, isCertified } = useContext(GuideContext);

	const [certificatesModal, showCertificatesModal] = useModal();
	const openCertificatesModal = () => showCertificatesModal();

	const languages = {
		languages: ['English', 'Hindi', 'Spanish'],
		levels: ['Conversational', 'Fluent', 'Basic']
	};

	const infoClassName = classNames("box is-inline-flex is-flex-wrap-wrap is-justify-content-start has-text-start is-flex-gap-6 is-shadowless mx-auto");

	return <>

		<div className={infoClassName} style={{ border: `1px solid ${borderColor}` }}>
			<div>
				<SubSectionTitle>Rating</SubSectionTitle>
				<RatingStars rating={rating} className="is-flex" containerStyle={{ gap: '0.3rem' }} />
			</div>
			<div>
				<SubSectionTitle>Languages</SubSectionTitle>
				<div className="is-flex is-flex-gap-3">
					<div className="is-flex is-flex-direction-column is-flex-gap-1">
						{languages.languages.map((language, index) => <span key={index}>{language}:</span>)}
					</div>
					<div className="is-flex is-flex-direction-column is-flex-gap-1">
						{languages.levels.map((level, index) => <span key={index}>{level}</span>)}
					</div>
				</div>
			</div>
			<div>
				<SubSectionTitle>Certificates</SubSectionTitle>
				{!isCertified
					? <span className="is-danger">Guide did not provide any certificates.</span>
					: <a onClick={openCertificatesModal} className="is-block is-clickable has-text-link" style={{ maxWidth: '18ch' }}>
						Tour guide certificate{certificates.length > 1 && ` and ${certificates.length - 1} more`}
					</a>}
			</div>
		</div>

		<Modal {...certificatesModal} render={() => <div className="is-flex is-flex-direction-column is-flex-gap-4">
			{certificates.map(({ certificate, caption }, index) => <div key={index}>
				<img {...certificate} />
				<p className="is-size-7 has-text-centered mt-1">{caption}</p>
			</div>)}
		</div>} />

	</>;
}

function SubSectionTitle({ children }) {
	return <div className="is-size-6 has-text-weight-medium mb-3" style={{ lineHeight: 1 }}>
		{children}:
	</div>;
}