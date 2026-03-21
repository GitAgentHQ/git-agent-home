import type { Language } from "../i18n/translations";

export type I18nText = Record<Language, string>;

export interface FaqItem {
	question: I18nText;
	answer: I18nText;
}

export interface CrossLink {
	label: I18nText;
	href: string;
}
