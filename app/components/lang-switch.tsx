import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";
import { motionEase, useAccessibleMotion } from "../utils/motion-prefs";

export function LangSwitch() {
	const { language, setLanguage } = useLanguage();
	const reduced = useAccessibleMotion();

	const toggle = () => {
		setLanguage(language === "en" ? "zh" : "en");
	};

	return (
		<motion.button
			className="lang-switch"
			onClick={toggle}
			aria-label={language === "en" ? "Switch to Chinese" : "切换到英文"}
			whileHover={
				reduced
					? undefined
					: { borderColor: "rgba(255,255,255,0.55)", color: "#fff" }
			}
			transition={{ duration: reduced ? 0 : 0.28, ease: motionEase }}
		>
			{language === "en" ? "中文" : "EN"}
		</motion.button>
	);
}
