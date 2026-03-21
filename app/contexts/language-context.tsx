import { createContext, useContext, useState, type ReactNode } from "react";
import { type Language, translations, type Translations } from "../i18n/translations";

interface LanguageContextValue {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguage] = useState<Language>(() => {
		// Try to detect from browser
		const browserLang = navigator.language.toLowerCase();
		if (browserLang.startsWith("zh")) return "zh";
		return "en";
	});

	const t = translations[language];

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
