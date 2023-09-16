import { useEffect } from "react";
import Quill from 'quill';
import { useFormContext } from 'react-hook-form';
import classNames from "classnames";

import cleanUGT from "@lib/clean-user-generated-text";

import { richTextContainer } from '@pages/Editor/index.module.sass';
import { copy } from "@pages/Editor";

export default function RichEditor({ id, label, placeholder }) {
	import('quill/dist/quill.core.css');
	import('quill/dist/quill.snow.css');

	const { getValues, setValue, getFieldState } = useFormContext();

	const state = getFieldState(id);

	const editorMountElemId = `${id}-editor-mount-elem`;
	const richTextContainerClassName = classNames(richTextContainer, 'field');

	let editor;

	useEffect(() => {
		if (editor) return;

		const value = getValues(id);

		editor = new Quill(`[data-id="${editorMountElemId}"]`, {
			modules: {
				toolbar: [
					['strike', 'underline', 'italic', 'bold'],
					[{ 'color': [] }],
					['clean']
				]
			},
			placeholder,
			theme: 'snow'
		});

		if (value) editor.root.innerHTML = value;

		editor.on('text-change', () => setValue(id, cleanUGT(editor.root.innerHTML)));
	}, []);

	return <div className={richTextContainerClassName}>
		<label className='label'>{label}:</label>
		<div data-id={editorMountElemId} />
		{state?.error?.required && <p className="help is-danger">{copy.requiredField}</p>}
	</div>;
}