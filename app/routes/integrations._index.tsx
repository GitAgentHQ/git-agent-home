import type { MetaFunction } from "react-router";
import { buildMeta } from "../lib/meta";
import { BASE_URL } from "../lib/constants";
import { integrationEntries } from "../data/integrations";
import { PseoLayout } from "../components/pseo-layout";
import { HubGrid } from "../components/hub-grid";
import { useLanguage } from "../contexts/language-context";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "Git Agent Integrations | git-agent",
		description:
			"How git-agent integrates with GitHub Actions, GitLab CI, Husky, pre-commit, Lefthook, semantic-release, release-please, and CircleCI.",
		canonicalUrl: `${BASE_URL}/integrations`,
	});

export default function IntegrationsIndex() {
	const { language, t } = useLanguage();

	return (
		<PseoLayout breadcrumb={t.pseoCrumbIntegrations} backHref="/">
			<header className="command-hero">
				<code className="command-label">{t.pseoEyebrowIntegrations}</code>
				<h1 className="command-heading">{t.pseoIntegrationsHubTitle}</h1>
				<p className="section-body">{t.pseoIntegrationsHubSubtitle}</p>
			</header>

			<HubGrid
				entries={integrationEntries}
				basePath="/integrations"
				labelKey="tool"
				descKey="tagline"
				currentLang={language}
			/>
		</PseoLayout>
	);
}