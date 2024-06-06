import { Suspense, useContext } from 'react';
import classNames from 'classnames';

import { EditorContext } from '@pages/Editor';
import TopBanner from '@pages/Editor/TopBanner';
import Loader from '@elements/Loader';

import { useFieldLabels } from '@hooks/use-i18n';

import { innerFieldsContainer, saveButtonContainer } from '@pages/Editor/index.module.sass';

export default function ThemeFields({ fieldGroup: FieldGroup, hasErrors, isLoading, onSubmit }) {
	const t = useFieldLabels();
	const { dir: { forward, backward } } = useContext(EditorContext);

	const submitClassName = classNames('button is-primary is-fullwidth is-justify-content-center has-text-weight-bold', isLoading && 'is-loading');

	return <Suspense fallback={<Loader />}>
		<div className={innerFieldsContainer} style={{ direction: backward }}>
			<div style={{ direction: forward }}>
				<TopBanner className="mb-3" />
				<FieldGroup />
			</div>
		</div>
		<div className={saveButtonContainer}>
			<button onClick={onSubmit} disabled={hasErrors || isLoading} title={hasErrors ? t.errors_are_red : ''} className={submitClassName}>
				{t.submit}
			</button>
		</div>
	</Suspense>;
}