import { borderColor } from "@domains/india4wdtours/lib/css";

import { delimiter } from "@domains/india4wdtours/index.module.sass";
import classNames from "classnames";

export default function Delimiter({ className: classes }) {
	const className = classNames(delimiter, classes);
	return <div className={className} style={{ backgroundColor: borderColor, alignSelf: 'normal' }} />;
}