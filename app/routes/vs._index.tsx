import type { MetaFunction } from "react-router";
import { buildMeta } from "../lib/meta";
import { comparisonEntries } from "../data/comparisons";
import { PseoLayout } from "../components/pseo-layout";
import { HubGrid } from "../components/hub-grid";
import { useLanguage } from "../contexts/language-context";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "git-agent vs Other AI Commit Tools | Comparisons",
		description:
			"Compare git-agent against aicommit2, Commitizen, czg, gitmoji-cli, and more. See how atomic commit splitting and a free tier set git-agent apart.",
		canonicalUrl: "https://gitagent.dev/vs",
	});

export default function VsIndex() {
	const { language, t } = useLanguage();

	return (
		<PseoLayout breadcrumb="vs" backHref="/">
			<header className="command-hero">
				<code className="command-label">git-agent vs</code>
				<h1 className="command-heading">{t.pseoVsHubTitle}</h1>
				<p className="section-body">{t.pseoVsHubSubtitle}</p>
			</header>

			<HubGrid
				entries={comparisonEntries}
				basePath="/vs"
				labelKey="name"
				descKey="tagline"
				currentLang={language}
			/>
		</PseoLayout>
	);
}
