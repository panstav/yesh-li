import { wrapI18n } from "@config/I18n";
import { HeadFor } from "@config/Meta";

import Editor, { editorProps } from "@pages/Editor";

import { wrapTitle, domainProps } from "@domains/gotit";

import i18n from "./i18n";

export default wrapI18n(Editor, i18n);

export const Head = HeadFor(() => ({
	...domainProps,
	...editorProps,
	...wrapTitle('Content editing'),
}));