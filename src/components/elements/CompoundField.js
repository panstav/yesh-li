import RenderChildren from "@wrappers/RenderChildren";

import { compoundField } from '@pages/Editor/index.module.sass';

export default function CompoundField(props) {
	const Wrapper = ((typeof props.if === 'function' && props.if()) || props.if || !Object.keys(props).includes('if')) ? 'div' : RenderChildren;
	return <Wrapper className={compoundField}>
		{props.children}
	</Wrapper>;
}