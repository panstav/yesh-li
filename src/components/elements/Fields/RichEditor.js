import { useEffect, useState } from "react";
import { useFormContext } from 'react-hook-form';
import classNames from "classnames";

import cleanUGT from "@lib/clean-user-generated-text";

import { useFieldLabels } from "@hooks/use-i18n";

import { richTextContainer } from '@pages/Editor/index.module.sass';

let Quill;

export default function RichEditor({ id, label, placeholder, maxLength, withLink }) {
	import('quill/dist/quill.core.css');
	import('quill/dist/quill.snow.css');

	const t = useFieldLabels();

	const [isModuleLoaded, setIsModuleLoaded] = useState(!!Quill);

	const { getValues, setValue, getFieldState, setError, clearErrors } = useFormContext();

	const { error } = getFieldState(id);

	const editorMountElemId = `${id}-editor-mount-elem`;
	const richTextContainerClassName = classNames(richTextContainer, 'field');

	let editor;

	useEffect(() => {
		if (Quill) return;
		import('quill').then((mod) => {
			Quill = mod;
			setIsModuleLoaded(true);
		});
	});

	useEffect(() => {

		if (editor || !isModuleLoaded) return;

		const value = getValues(id);
		const bounds = `[data-id="${editorMountElemId}"]`;

		const link = withLink ? ['link'] : [];

		editor = new Quill.default(bounds, {
			bounds,
			modules: {
				toolbar: [
					['strike', 'underline', 'italic', 'bold'],
					[...link, { 'color': [] }],
					['clean']
				]
			},
			placeholder,
			theme: 'snow'
		});

		if (value) editor.root.innerHTML = value;

		editor.on('text-change', () => {
			clearErrors(id);

			// check whether the editor is empty
			// use another element to check for innerText because Quill's root element never has innerText ¯\_(ツ)_/¯
			const elem = document.createElement('div');
			elem.innerHTML = editor.root.innerHTML;
			const strippedText = elem.innerText.trim();

			// if it is, set the value to an empty string instead of an empty paragraph or span or whatever
			if (!strippedText) return setValue(id, '');
			if (maxLength && strippedText.length > maxLength) return setError(id, { type: 'maxLength', message: t.maxLengthField(maxLength) });

			// if it's not, set the value to the editor's innerHTML after cleaning it
			setValue(id, cleanUGT(editor.root.innerHTML.replaceAll('<br>', '')));
		});
	}, [isModuleLoaded]);

	return <div className={richTextContainerClassName}>
		<label className='label'>{label}:</label>
		<div data-id={editorMountElemId} />
		{error?.message && <p className='help is-danger'>{error?.message}</p>}
	</div>;
}