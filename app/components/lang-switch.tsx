import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";

export function LangSwitch() {
	const { language, setLanguage } = useLanguage();

	const toggle = () => {
		setLanguage(language === "en" ? "zh" : "en");
	};

	return (
		<motion.button
			className="lang-switch"
			onClick={toggle}
			aria-label={language === "en" ? "Switch to Chinese" : "切换到英文"}
			whileHover={{ borderColor: "rgba(255,255,255,0.55)", color: "#fff" }}
			transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
		>
			{language === "en" ? "中文" : "EN"}
		</motion.button>
	);
}
