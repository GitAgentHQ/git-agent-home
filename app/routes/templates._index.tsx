import type { MetaFunction } from "react-router";
import { buildMeta } from "../lib/meta";
import { templateEntries } from "../data/templates";
import { PseoLayout } from "../components/pseo-layout";
import { HubGrid } from "../components/hub-grid";
import { useLanguage } from "../contexts/language-context";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "Conventional Commit Message Templates | git-agent",
		description:
			"Templates and examples for every conventional commit type: feat, fix, refactor, docs, test, chore, perf, style, ci, and breaking changes.",
		canonicalUrl: "https://gitagent.dev/templates",
	});

export default function TemplatesIndex() {
	const { language, t } = useLanguage();

	return (
		<PseoLayout breadcrumb="templates" backHref="/">
			<header className="command-hero">
				<code className="command-label">commit templates</code>
				<h1 className="command-heading">{t.pseoTemplatesHubTitle}</h1>
				<p className="section-body">{t.pseoTemplatesHubSubtitle}</p>
			</header>

			<HubGrid
				entries={templateEntries}
				basePath="/templates"
				labelKey="type"
				descKey="description"
				currentLang={language}
			/>
		</PseoLayout>
	);
}
