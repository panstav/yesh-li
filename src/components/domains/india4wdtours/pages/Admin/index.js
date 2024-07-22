import { HeadFor } from "@config/Meta";

import EditorWrapper, { editorProps } from "@pages/Editor";

import { wrapTitle, domainProps, wrapPage } from "@domains/india4wdtours";

export default wrapPage(EditorPage, { i18nOnly: true });

export const Head = HeadFor(() => ({
	...domainProps,
	...editorProps,
	...wrapTitle('Admin'),
}));

function EditorPage(props) {
	return <EditorWrapper adminOnly domainControl {...props} />;
}