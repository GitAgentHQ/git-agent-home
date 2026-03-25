import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { buildMeta, faqJsonLd } from "../lib/meta";
import { BASE_URL, INSTALL_COMMAND } from "../lib/constants";
import { CrossLinksSection } from "../components/cross-links-section";
import { PseoLayout } from "../components/pseo-layout";
import { CodeBlock } from "../components/code-block";
import { useLanguage } from "../contexts/language-context";
import { renderInlineDocText } from "../utils/inline-doc-text";

export async function loader({ params }: LoaderFunctionArgs) {
	const { findGlossaryTerm } = await import("../data/glossary");
	const entry = findGlossaryTerm(params.term ?? "");
	if (!entry) throw new Response("Not Found", { status: 404 });
	return { entry };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.entry) return [{ title: "Not Found" }];
	const { entry } = data;
	return [
		...buildMeta({
			title: `What is ${entry.term.en}? | git-agent Glossary`,
			description: entry.definition.en,
			canonicalUrl: `${BASE_URL}/glossary/${entry.slug}`,
		}),
		{
			"script:ld+json": faqJsonLd(entry.faq.map((f) => ({ question: f.question.en, answer: f.answer.en }))),
		},
	];
};

export default function GlossaryTerm() {
	const { entry } = useLoaderData<typeof loader>();
	const { language, t } = useLanguage();

	return (
		<PseoLayout
			breadcrumb={`glossary / ${entry.slug}`}
			backHref="/glossary"
		>
			<header className="command-hero">
				<code className="command-label">glossary</code>
				<h1 className="command-heading">{entry.term[language]}</h1>
				<p className="section-body">{renderInlineDocText(entry.definition[language])}</p>
			</header>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionExplanation}</h2>
				<p className="section-body">{renderInlineDocText(entry.longDescription[language])}</p>
			</section>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionExamples}</h2>
				{entry.examples.map((ex, i) => (
					<CodeBlock key={i} code={ex} />
				))}
			</section>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionHowHelps}</h2>
				<p className="section-body">{renderInlineDocText(entry.howGitAgentHelps[language])}</p>
				<div style={{ marginTop: 14 }}>
					<CodeBlock code={INSTALL_COMMAND} />
				</div>
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

			<CrossLinksSection links={entry.relatedLinks} />
		</PseoLayout>
	);
}
