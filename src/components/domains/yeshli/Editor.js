import { HeadFor } from "@config/Meta";

import Editor, { editorProps } from "@pages/Editor";

import { wrapTitle, domainProps, wrapPage } from "@domains/yeshli";

export default wrapPage(Editor);

export const Head = HeadFor(() => ({
	...domainProps,
	...editorProps,
	...wrapTitle('ניהול תוכן'),
}));