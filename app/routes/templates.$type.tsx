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
	const { findTemplate } = await import("../data/templates");
	const entry = findTemplate(params.type ?? "");
	if (!entry) throw new Response("Not Found", { status: 404 });
	return { entry };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.entry) return [{ title: "Not Found" }];
	const { entry } = data;
	return [
		...buildMeta({
			title: `${entry.type.en} Commit Message Template | git-agent`,
			description: entry.description.en,
			canonicalUrl: `${BASE_URL}/templates/${entry.slug}`,
		}),
		{
			"script:ld+json": faqJsonLd(entry.faq.map((f) => ({ question: f.question.en, answer: f.answer.en }))),
		},
	];
};

export default function TemplatesType() {
	const { entry } = useLoaderData<typeof loader>();
	const { language, t } = useLanguage();

	return (
		<PseoLayout
			breadcrumb={`templates / ${entry.slug}`}
			backHref="/templates"
		>
			<header className="command-hero">
				<code className="command-label">commit type</code>
				<h1 className="command-heading">
					<span className="command-heading-type">{entry.type[language]}</span>{" "}
					{t.pseoCommitTemplateSuffix}
				</h1>
				<p className="section-body">{renderInlineDocText(entry.description[language])}</p>
			</header>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionFormat}</h2>
				<CodeBlock code={entry.templateFormat} />
			</section>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionRealExamples}</h2>
				{entry.realExamples.map((ex, i) => (
					<div key={i} style={{ marginBottom: 8 }}>
						<CodeBlock code={ex} />
					</div>
				))}
			</section>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionWhenToUse}</h2>
				<p className="section-body">{renderInlineDocText(entry.whenToUse[language])}</p>
				<p className="section-body" style={{ marginTop: 12 }}>{renderInlineDocText(t.pseoSectionGitAgentInfers)}</p>
				<code className="pseo-install-snippet" style={{ marginTop: 14 }}>
					{INSTALL_COMMAND}
				</code>
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
