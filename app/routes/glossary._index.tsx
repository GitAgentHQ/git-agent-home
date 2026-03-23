import type { MetaFunction } from "react-router";
import { buildMeta } from "../lib/meta";
import { BASE_URL } from "../lib/constants";
import { glossaryEntries } from "../data/glossary";
import { PseoLayout } from "../components/pseo-layout";
import { HubGrid } from "../components/hub-grid";
import { useLanguage } from "../contexts/language-context";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "Git and Conventional Commits Glossary | git-agent",
		description:
			"Definitions for conventional commits, atomic commits, pre-commit hooks, semantic versioning, and other Git workflow concepts.",
		canonicalUrl: `${BASE_URL}/glossary`,
	});

export default function GlossaryIndex() {
	const { language, t } = useLanguage();

	return (
		<PseoLayout breadcrumb="glossary" backHref="/">
			<header className="command-hero">
				<code className="command-label">glossary</code>
				<h1 className="command-heading">{t.pseoGlossaryHubTitle}</h1>
				<p className="section-body">{t.pseoGlossaryHubSubtitle}</p>
			</header>

			<HubGrid
				entries={glossaryEntries}
				basePath="/glossary"
				labelKey="term"
				descKey="definition"
				currentLang={language}
			/>
		</PseoLayout>
	);
}
