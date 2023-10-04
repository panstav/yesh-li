import { createContext } from "react";

import ThemeProvider from "@config/ThemeProvider";

// import { container } from "./theme.module.sass";

export const PageContext = createContext();

export default function ThemeName({ content }) {

	return <ThemeProvider>
		<PageContext.Provider value={{ content }}>

		</PageContext.Provider>
	</ThemeProvider>;
}