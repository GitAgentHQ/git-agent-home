import type { MetaFunction } from "react-router";
import { buildMeta } from "../lib/meta";
import { personaEntries } from "../data/personas";
import { PseoLayout } from "../components/pseo-layout";
import { HubGrid } from "../components/hub-grid";
import { useLanguage } from "../contexts/language-context";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "Git Commit Message Generator by Language | git-agent",
		description:
			"AI-powered conventional commit messages for every language and framework. Python, TypeScript, Go, Rust, Java, Swift, and more.",
		canonicalUrl: "https://gitagent.dev/for",
	});

export default function ForIndex() {
	const { language, t } = useLanguage();

	return (
		<PseoLayout breadcrumb="for" backHref="/">
			<header className="command-hero">
				<code className="command-label">git-agent for</code>
				<h1 className="command-heading">{t.pseoForHubTitle}</h1>
				<p className="section-body">{t.pseoForHubSubtitle}</p>
			</header>

			<HubGrid
				entries={personaEntries}
				basePath="/for"
				labelKey="language"
				descKey="tagline"
				currentLang={language}
			/>
		</PseoLayout>
	);
}
