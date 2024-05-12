import { useEffect, useRef } from 'react';
import { FocusPicker } from 'image-focus';

import { useFieldLabels } from '@hooks/use-i18n';

import { Title } from '@wrappers/Modal';

export default function FocusModal({ setValue, getValues, imageToFocus, watch }) {

	const t = useFieldLabels();

	watch('position');
	const position = getValues('position') || imageToFocus.position || '50% 50%';
	const setFocus = ({ x, y }) => setValue('position', `${Math.round(((x + 1) / 2) * 1000) / 10}% ${Math.round((1 - ((y + 1) / 2)) * 1000) / 10}%`);

	const ref = useRef(null);

	useEffect(() => {
		const x = Number(position.split(' ')[0].replace('%', '')) / 100 * 2 - 1;
		const y = 1 - (Number(position.split(' ')[1].replace('%', '')) / 100 * 2);

		new FocusPicker(ref.current, {
			onChange: setFocus,
			focus: { x, y }
		});
	}, [ref]);

	return <>
		<Title>{t.set_image_focus}</Title>
		<div className='mx-auto' style={{ width: '20rem' }}>
			<img ref={ref} srcSet={imageToFocus.srcSet} />
		</div>
		<div className='is-flex is-justify-content-space-evenly is-align-items-center mt-6'>
			<div className='mx-auto has-radius' style={{ width: '6rem', height: '10rem', overflow: 'hidden', border: '0.25em solid var(--color-primary)' }}>
				<img srcSet={imageToFocus.srcSet} style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: position }} />
			</div>
			<div className='mx-auto has-radius' style={{ width: '10rem', height: '6rem', overflow: 'hidden', border: '0.25em solid var(--color-primary)' }}>
				<img srcSet={imageToFocus.srcSet} style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: position }} />
			</div>
		</div>
		<div className='is-flex is-justify-content-end'>
			<button className='button is-primary mt-5'>{t.submit}</button>
		</div>
	</>;
}