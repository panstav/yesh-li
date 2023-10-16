import { useEffect } from "react";
import Quill from 'quill';
import { useFormContext } from 'react-hook-form';
import classNames from "classnames";

import cleanUGT from "@lib/clean-user-generated-text";

import { richTextContainer } from '@pages/Editor/index.module.sass';
import copy from '@pages/Editor/copy';

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

		editor.on('text-change', () => {
			// check whether the editor is empty
			// use another element to check for innerText because Quill's root element never has innerText ¯\_(ツ)_/¯
			const elem = document.createElement('div');
			elem.innerHTML = editor.root.innerHTML;
			// if it is, set the value to an empty string instead of an empty paragraph or span or whatever
			if (!elem.innerText.trim()) return setValue(id, '');

			// if it's not, set the value to the editor's innerHTML after cleaning it
			setValue(id, cleanUGT(editor.root.innerHTML.replaceAll('<br>', '')));
		});
	}, []);

	return <div className={richTextContainerClassName}>
		<label className='label'>{label}:</label>
		<div data-id={editorMountElemId} />
		{state?.error?.required && <p className="help is-danger">{copy.requiredField}</p>}
	</div>;
}