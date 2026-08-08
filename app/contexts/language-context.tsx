import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Language, translations, type Translations } from "../i18n/translations";

const STORAGE_KEY = "git-agent-lang";

interface LanguageContextValue {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(v: string | null): v is Language {
	return v === "en" || v === "zh";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");

	// Precedence: URL ?lang= > localStorage > browser language > "en".
	// Runs client-side only; SSR always starts "en" to avoid hydration mismatch.
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const fromUrl = params.get("lang");
		if (isLanguage(fromUrl)) {
			setLanguage(fromUrl);
			return;
		}
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (isLanguage(stored)) {
			setLanguage(stored);
			return;
		}
		const browserLang = navigator.language.toLowerCase();
		if (browserLang.startsWith("zh")) {
			setLanguage("zh");
		}
	}, []);

	const apply = (lang: Language) => {
		setLanguage(lang);
		try {
			window.localStorage.setItem(STORAGE_KEY, lang);
		} catch {
			/* storage may be unavailable */
		}
		// Reflect the choice in the URL so a shared/reloaded link keeps it.
		try {
			const params = new URLSearchParams(window.location.search);
			params.set("lang", lang);
			const qs = params.toString();
			window.history.replaceState(
				null,
				"",
				window.location.pathname + (qs ? `?${qs}` : ""),
			);
		} catch {
			/* history may be unavailable in sandboxed contexts */
		}
	};

	const t = translations[language];

	return (
		<LanguageContext.Provider value={{ language, setLanguage: apply, t }}>
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
