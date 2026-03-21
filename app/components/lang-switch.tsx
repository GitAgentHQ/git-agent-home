import { useLanguage } from "../contexts/language-context";
import { type Language } from "../i18n/translations";

export function LangSwitch() {
	const { language, setLanguage } = useLanguage();

	const toggle = () => {
		setLanguage(language === "en" ? "zh" : "en");
	};

	return (
		<button
			className="lang-switch"
			onClick={toggle}
			aria-label={language === "en" ? "Switch to Chinese" : "切换到英文"}
		>
			{language === "en" ? "中文" : "EN"}
		</button>
	);
}
