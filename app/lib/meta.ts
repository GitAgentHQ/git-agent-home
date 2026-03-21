export type BuildMetaInput = {
	title: string;
	description: string;
	canonicalUrl: string;
};

/**
 * Standard SEO meta tags for programmatic SEO routes (title, description, OG, canonical).
 */
export function buildMeta({ title, description, canonicalUrl }: BuildMetaInput) {
	return [
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:url", content: canonicalUrl },
		{ property: "og:type", content: "website" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ tagName: "link", rel: "canonical", href: canonicalUrl },
	];
}

const SITE_NAME = "git-agent";
const SITE_URL = "https://gitagent.dev";

/**
 * JSON-LD for the git-agent CLI as a SoftwareApplication.
 */
export function softwareAppJsonLd(): string {
	const data = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: SITE_NAME,
		applicationCategory: "DeveloperApplication",
		operatingSystem: "macOS, Linux, Windows",
		url: SITE_URL,
		description:
			"AI-first Git CLI for conventional commits and atomic commit splits.",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
	};
	return JSON.stringify(data);
}

type FaqPair = { question: string; answer: string };

/**
 * FAQPage JSON-LD from English question/answer pairs (used for crawlable FAQ rich results).
 */
export function faqJsonLd(items: FaqPair[]): string {
	const data = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
	return JSON.stringify(data);
}
