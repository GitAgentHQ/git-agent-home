import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { buildMeta, softwareAppJsonLd, faqJsonLd } from "../lib/meta";
import { findComparison } from "../data/comparisons";
import { CrossLinksSection } from "../components/cross-links-section";
import { PseoLayout } from "../components/pseo-layout";
import { ComparisonTable } from "../components/comparison-table";
import { CodeBlock } from "../components/code-block";
import { useLanguage } from "../contexts/language-context";

export async function loader({ params }: LoaderFunctionArgs) {
	const entry = findComparison(params.competitor ?? "");
	if (!entry) throw new Response("Not Found", { status: 404 });
	return { entry };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.entry) return [{ title: "Not Found" }];
	const { entry } = data;
	return [
		...buildMeta({
			title: `git-agent vs ${entry.name} | Comparison`,
			description: entry.description.en,
			canonicalUrl: `https://gitagent.dev/vs/${entry.slug}`,
		}),
		{ "script:ld+json": softwareAppJsonLd() },
		{
			"script:ld+json": faqJsonLd(entry.faq.map((f) => ({ question: f.question.en, answer: f.answer.en }))),
		},
	];
};

export default function VsCompetitor() {
	const { entry } = useLoaderData<typeof loader>();
	const { language, t } = useLanguage();

	return (
		<PseoLayout
			breadcrumb={`vs / ${entry.slug}`}
			backHref="/vs"
		>
			<header className="command-hero">
				<code className="command-label">comparison</code>
				<h1 className="command-heading">{entry.tagline[language]}</h1>
				<p className="section-body">{entry.competitorDescription[language]}</p>
			</header>

			<section className="command-section">
				<h2 className="section-label">{t.pseoSectionFeatureComparison}</h2>
				<ComparisonTable
					rows={entry.rows}
					competitorName={entry.name}
					language={language}
				/>
			</section>

			<div className="pseo-two-col">
				<section className="command-section">
					<h2 className="section-label">{t.pseoSectionInstall}</h2>
					<CodeBlock code={entry.installComparison.gitAgent} label="git-agent" />
					<CodeBlock code={entry.installComparison.competitor} label={entry.name} />
				</section>

				<section className="command-section">
					<h2 className="section-label">{t.pseoSectionOutputExample}</h2>
					<CodeBlock code={entry.outputExample.gitAgent} label="git-agent" />
					<CodeBlock code={entry.outputExample.competitor} label={entry.name} />
				</section>
			</div>

			<section className="command-section">
				<h2 className="section-label">{t.pseoFaq}</h2>
				<div className="flag-list">
					{entry.faq.map((item, i) => (
						<div key={i} className="flag-row">
							<code className="flag-name">{item.question[language]}</code>
							<div className="flag-info">
								<span className="flag-desc">{item.answer[language]}</span>
							</div>
						</div>
					))}
				</div>
			</section>

			<CrossLinksSection links={entry.relatedLinks} />
		</PseoLayout>
	);
}
