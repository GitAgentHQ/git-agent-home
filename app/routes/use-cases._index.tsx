import type { MetaFunction } from "react-router";
import { buildMeta } from "../lib/meta";
import { BASE_URL } from "../lib/constants";
import { useCaseEntries } from "../data/use-cases";
import { PseoLayout } from "../components/pseo-layout";
import { HubGrid } from "../components/hub-grid";
import { useLanguage } from "../contexts/language-context";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "Git Agent Use Cases | git-agent",
		description:
			"Explore how git-agent helps with monorepo management, CI/CD pipelines, open source contributions, code review workflows, team standards, and solo development.",
		canonicalUrl: `${BASE_URL}/use-cases`,
	});

export default function UseCasesIndex() {
	const { language, t } = useLanguage();

	return (
		<PseoLayout breadcrumb={t.pseoCrumbUseCases} backHref="/">
			<header className="command-hero">
				<code className="command-label">{t.pseoEyebrowUseCases}</code>
				<h1 className="command-heading">{t.pseoUseCasesHubTitle}</h1>
				<p className="section-body">{t.pseoUseCasesHubSubtitle}</p>
			</header>

			<HubGrid
				entries={useCaseEntries}
				basePath="/use-cases"
				labelKey="title"
				descKey="tagline"
				currentLang={language}
			/>
		</PseoLayout>
	);
}