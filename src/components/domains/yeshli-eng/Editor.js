import { HeadFor } from "@config/Meta";

import Editor, { editorProps } from "@pages/Editor";

import { wrapTitle, domainProps, wrapPage } from "@domains/yeshli-eng";

export default wrapPage(Editor);

export const Head = HeadFor(() => ({
	...domainProps,
	...editorProps,
	...wrapTitle('CMS'),
}));