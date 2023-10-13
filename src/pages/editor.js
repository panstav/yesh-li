import { HeadFor } from "@config/Meta";
import MicrosoftClarity from "@elements/MicrosoftClarity";

export { default } from "@pages/Editor";

export const Head = HeadFor({ title: "Editor", _children: <MicrosoftClarity /> });