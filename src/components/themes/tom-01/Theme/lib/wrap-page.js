import Header from "@themes/tom-01/Theme/config/Header";
import Footer from "@themes/tom-01/Theme/config/Footer";

export default function wrapPage (Page) {
	Page.customComponents = { Header, Footer };
	return Page;
}