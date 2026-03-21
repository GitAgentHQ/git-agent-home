import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { buildMeta, softwareAppJsonLd, faqJsonLd } from "../lib/meta";
import { findPersona } from "../data/personas";
import { CrossLinksSection } from "../components/cross-links-section";
import { PseoLayout } from "../components/pseo-layout";
import { CodeBlock } from "../components/code-block";
import { useLanguage } from "../contexts/language-context";
import { renderInlineDocText } from "../utils/inline-doc-text";

export async function loader({ params }: LoaderFunctionArgs) {
	const entry = findPersona(params.language ?? "");
	if (!entry) throw new Response("Not Found", { status: 404 });
	return { entry };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.entry) return [{ title: "Not Found" }];
	const { entry } = data;
	return [
		...buildMeta({
			title: `Git Commit Message Generator for ${entry.language.en} | git-agent`,
			description: entry.description.en,
			canonicalUrl: `https://gitagent.dev/for/${entry.slug}`,
		}),
		{
			"script:ld+json": softwareAppJsonLd(),
		},
		{
			"script:ld+json": faqJsonLd(entry.faq.map((f) => ({ question: f.question.en, answer: f.answer.en }))),
		},
	];
};

export default function ForLanguage() {
	const { entry } = useLoaderData<typeof loader>();
	const { language, t } = useLanguage();

	const crossLinks = entry.relatedLinks;

	return (
		<PseoLayout
			breadcrumb={`for / ${entry.slug}`}
			backHref="/for"
		>
			<header className="command-hero">
				<code className="command-label">git-agent for {entry.language[language]}</code>
				<h1 className="command-heading">{entry.tagline[language]}</h1>
				<p className="section-body">{renderInlineDocText(entry.description[language])}</p>
			</header>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionDiffExample}</h2>
				<CodeBlock code={entry.diffExample} />
				<div style={{ marginTop: 14 }}>
					<CodeBlock
						code={entry.commitExample}
						label={t.pseoSectionGitAgentOutput}
					/>
				</div>
			</section>

			<section className="command-section">
				<h2 className="section-label">
					{t.pseoWhyWorksFor.replace("{lang}", entry.language[language])}
				</h2>
				<ul className="entry-card-features">
					{entry.features.map((f, i) => (
						<li key={i}>{f[language]}</li>
					))}
				</ul>
			</section>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionInstall}</h2>
				<code className="pseo-install-snippet">{entry.installSnippet}</code>
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
