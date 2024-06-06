import Header from "@themes/tom-01/Theme/config/Header";
import Footer from "@themes/tom-01/Theme/config/Footer";
import Background from "@themes/tom-01/Theme/config/Background";

export default function wrapPage (Page) {
	Page.customComponents = { Header, Footer, Background };
	return Page;
}