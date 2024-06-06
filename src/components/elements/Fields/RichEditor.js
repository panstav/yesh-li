import { useContext, useEffect, useState } from "react";
import { useFormContext } from 'react-hook-form';
import classNames from "classnames";

import Loader from "@elements/Loader";

import { useFieldLabels } from "@hooks/use-i18n";

import cleanUGT from "@lib/clean-user-generated-text";
import parseSrcSet from "@lib/parse-srcset";

import { EditorContext, allowedImageTypes, acceptedFileSuffixes } from '@pages/Editor';
import { richTextContainer } from '@pages/Editor/index.module.sass';

let Quill;

export default function RichEditor({ id, label, placeholder, maxLength, withLink, withHeaders, withImage }) {
	import('quill/dist/quill.core.css');
	import('quill/dist/quill.snow.css');

	const t = useFieldLabels();

	const [isModuleLoaded, setIsModuleLoaded] = useState(!!Quill);
	const [isPending, setIsPending] = useState(false);

	const { getValues, setValue, getFieldState, setError, clearErrors } = useFormContext();
	const { error } = getFieldState(id);

	const { uploadImage, modals } = useContext(EditorContext);

	const editorMountElemId = `${id}-editor-mount-elem`;
	const richTextContainerClassName = classNames(richTextContainer, 'field');

	let editor;

	useEffect(ensureEditorLoads);
	useEffect(editorOnLoad, [isModuleLoaded]);

	// decrease opacity of the editor while it's pending
	const editorContainerStyle = isPending ? { opacity: 0.25 } : {};
	// ensure editor fades to white while it's pending
	const loaderContainerStyle = isPending ? { backgroundColor: 'white', pointerEvents: 'none' } : {};

	return <div className={richTextContainerClassName}>
		<label className='label'>{label}:</label>
		<div className="is-relative" style={loaderContainerStyle}>
			{isPending && <Loader marginTop="6rem" />}
			<div style={editorContainerStyle}>
				<div data-id={editorMountElemId} />
			</div>
		</div>
		{error?.message && <p className='help is-danger'>{error?.message}</p>}
	</div>;

	function editorOnLoad() {

		if (editor || !isModuleLoaded) return;

		const value = getValues(id);
		const bounds = `[data-id="${editorMountElemId}"]`;

		const link = withLink ? ['link'] : [];
		const headers = withHeaders ? [{ header: [1, 2, 3, 4, 5, 6, false] }] : [];
		const image = withImage ? ['image'] : [];

		editor = new Quill.default(bounds, {
			bounds,
			modules: {
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],
					[...headers, ...link, { 'color': [] }],
					['clean'],
					[...image]
				]
			},
			placeholder,
			theme: 'snow'
		});

		// extend the image handler to allow validation, multiple images, and uploading instead of injecting base64
		editor.getModule("toolbar").addHandler("image", imageHandler);

		if (value) editor.root.innerHTML = value;

		editor.on('text-change', () => {
			clearErrors(id);

			// check whether the editor is empty
			// use another element to check for innerText because Quill's root element never has innerText ¯\_(ツ)_/¯
			const elem = document.createElement('div');
			elem.innerHTML = editor.root.innerHTML;
			const strippedText = elem.innerText.trim();

			// if it is, set the value to an empty string instead of an empty paragraph or span or whatever
			if (!strippedText) return setValue(id, '', { shouldValidate: true });
			if (maxLength && strippedText.length > maxLength) return setError(id, { type: 'maxLength', message: t.maxLengthField(maxLength) });

			// if it's not, set the value to the editor's innerHTML after cleaning it
			setValue(id, cleanUGT(editor.root.innerHTML.replaceAll('<br>', '')));
		});
	}

	function ensureEditorLoads() {
		if (Quill) return;
		import('quill').then((mod) => {
			Quill = mod;
			setIsModuleLoaded(true);
		});
	}

	function imageHandler() {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('multiple', 'true');
		input.setAttribute('accept', acceptedFileSuffixes);
		input.click();

		// Listen upload local image and save to server
		input.onchange = onFileChange;

		async function onFileChange() {
			const filesArr = Array.from(input.files);

			if (filesArr.some((file) => !allowedImageTypes.includes(file.type))) return modals.showSupportedFileTyes();

			setIsPending(true);
			const srcSets = await Promise.all(Array.from(input.files).map((file) => {
				return uploadImage({ file, limit: 800, slug: getValues('slug') });
			}));

			// enter a simple <img src={$0} /> for each image
			srcSets.forEach(({ srcSet }) => {
				const range = editor.getSelection();
				editor.insertEmbed(range.index, 'image', parseSrcSet(srcSet)[0]);
			});
			setIsPending(false);
		}

	}

}