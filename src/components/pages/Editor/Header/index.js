import { memo, useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';

import useI18n from '@hooks/use-i18n';

import Modal, { useModal, useSuccessModal } from '@wrappers/Modal';
import { Sheet } from '@elements/Icon';

import { EditorContext } from '@pages/Editor';
import { AuthContext } from '@pages/Editor/Auth';
import Nav from './Nav';
import MenuItems, { MenuItem } from './MenuItems';
import SlugChoice from './SlugChoice';
import AttachDomain from './AttachDomain';
export { default as SafeHeader } from './SafeHeader';

export default memo(Header, () => true);

function Header() {

	const [{ Editor: { Header: t, AttachDomain: { DomainAttachedSuccessFullyModal } }}] = useI18n();
	const { domainControl } = useContext(EditorContext);
	const { siteId } = useContext(AuthContext);

	const [slugUpdateSuccess, showSlugUpdateSuccess] = useSuccessModal({
		onHide: () => window.location.reload()
	});

	const [slugModal, showSlugModal] = useModal({
		shouldUseNativeValidation: false,
		onSubmit: async ({ slug }) => {
			await xhr.updateSlug({ slug, siteId });
			showSlugUpdateSuccess();
		}
	});

	const [domainModal, showDomainModal] = useModal();
	const [attachDomainSuccessModal, showAttachDomainSuccessModal] = useSuccessModal();
	const onAttachDomainSuccess = (domain) => showAttachDomainSuccessModal({ domain });

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	const burgerClasses = classNames('navbar-burger has-text-white', isOpen && 'is-active');
	const menuClasses = classNames('navbar-menu has-background-primary', isOpen && 'is-active');

	return <>
		<Nav logoClassName="is-clickable" burgerClasses={burgerClasses} burgerOnClick={toggleMenu}>
			<div className={menuClasses}>
				{!domainControl && <GoToSpreadsheet />}
				<div className="navbar-end">
					<MenuItems {...{
						showSlugModal, showDomainModal
					}} />
				</div>
			</div>
		</Nav>

		<Modal {...slugModal} render={SlugChoice} />

		<Modal {...domainModal} render={AttachDomain} onSuccess={onAttachDomainSuccess} />
		<Modal {...attachDomainSuccessModal} render={DomainAttachedSuccessFullyModal} />

		<Modal {...slugUpdateSuccess} render={() => t.slug_updated_successfully} />
	</>;
}

function GoToSpreadsheet () {

	const [{ Editor: { Header: t } }] = useI18n();

	const leadsTarget = useFormContext().getValues('leadsTarget');

	const isSpreadSheetAddress = leadsTarget.type === 'spreadsheet';
	const spreadSheetAddress = `https://docs.google.com/spreadsheets/d/${leadsTarget.address}`;

	if (!isSpreadSheetAddress) return null;

	return <div className="navbar-start is-flex-grow-1">
		<MenuItem label={t.my_leads_sheet} path={spreadSheetAddress} Icon={() => <Sheet className="w-1-touch" />} />
	</div>;
}