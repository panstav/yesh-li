import { HeadFor } from "@config/Meta";

import EditorWrapper, { editorProps } from "@pages/Editor";
import { wrapTitle, domainProps, wrapPage } from "@domains/yeshli";

export default wrapPage(EditorWrapper);

export const Head = HeadFor(() => ({
	...domainProps,
	...editorProps,
	...wrapTitle('ניהול תוכן'),
}));