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

export interface IntegrationEntry {
	slug: string;
	tool: I18nText;
	tagline: I18nText;
	description: I18nText;
	benefits: I18nText[];
	setupSteps: I18nText[];
	relatedLinks: CrossLink[];
	faq: FaqItem[];
}

export interface UseCaseEntry {
	slug: string;
	title: I18nText;
	tagline: I18nText;
	description: I18nText;
	challenge: I18nText;
	solution: I18nText;
	steps: I18nText[];
	relatedLinks: CrossLink[];
	faq: FaqItem[];
}
