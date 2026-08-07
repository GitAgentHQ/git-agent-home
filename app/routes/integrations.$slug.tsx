import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { buildMeta, faqJsonLd } from "../lib/meta";
import { BASE_URL } from "../lib/constants";
import { CrossLinksSection } from "../components/cross-links-section";
import { PseoLayout } from "../components/pseo-layout";
import { useLanguage } from "../contexts/language-context";
import { renderInlineDocText } from "../utils/inline-doc-text";

export async function loader({ params }: LoaderFunctionArgs) {
	const { findIntegration } = await import("../data/integrations");
	const entry = findIntegration(params.slug ?? "");
	if (!entry) throw new Response("Not Found", { status: 404 });
	return { entry };
}

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
	if (!loaderData?.entry) return [{ title: "Not Found" }];
	const { entry } = loaderData;
	return [
		...buildMeta({
			title: `How to use git-agent with ${entry.tool.en} | git-agent Integrations`,
			description: entry.description.en,
			canonicalUrl: `${BASE_URL}/integrations/${entry.slug}`,
		}),
		{
			"script:ld+json": faqJsonLd(
				entry.faq.map((f) => ({ question: f.question.en, answer: f.answer.en })),
			),
		},
	];
};

export default function IntegrationDetail() {
	const { entry } = useLoaderData<typeof loader>();
	const { language, t } = useLanguage();

	const crossLinks = entry.relatedLinks;

	return (
		<PseoLayout breadcrumb={`integrations / ${entry.slug}`} backHref="/integrations">
			<header className="command-hero">
				<code className="command-label">integration</code>
				<h1 className="command-heading">{entry.tagline[language]}</h1>
				<p className="section-body">{renderInlineDocText(entry.description[language])}</p>
			</header>

			<section className="command-section">
				<h2 className="section-label">{t.pseoIntegrationsSectionBenefits}</h2>
				<ul className="entry-card-features">
					{entry.benefits.map((b, i) => (
						<li key={i}>{b[language]}</li>
					))}
				</ul>
			</section>

			<section className="command-section">
				<h2 className="section-label">{t.pseoIntegrationsSectionSetupSteps}</h2>
				<ul className="entry-card-features">
					{entry.setupSteps.map((s, i) => (
						<li key={i}>{s[language]}</li>
					))}
				</ul>
			</section>

			<section className="command-section">
				<h2 className="section-label">{t.pseoFaq}</h2>
				<div className="flag-list">
					{entry.faq.map((item, i) => (
						<div key={i} className="flag-row">
							<code className="flag-name">{item.question[language]}</code>
							<div className="flag-info">
								<span className="flag-desc">{renderInlineDocText(item.answer[language])}</span>
							</div>
						</div>
					))}
				</div>
			</section>

			<CrossLinksSection links={crossLinks} />
		</PseoLayout>
	);
}