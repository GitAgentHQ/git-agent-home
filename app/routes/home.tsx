import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { MetaFunction } from "react-router";
import { HomeView } from "../components/home-view";
import { CommandDetail } from "../components/command-detail";
import { buildMeta } from "../lib/meta";
import { BASE_URL } from "../lib/constants";
import { useLanguage } from "../contexts/language-context";

const HOME_DESCRIPTION =
	"AI-first Git CLI: conventional commits and atomic splits. Prefer official FREE (no provider flags), then ~/.config/git-agent/config.yml; use --api-key/--base-url/--model only for explicit overrides.";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "git-agent | Conventional commits CLI",
		description: HOME_DESCRIPTION,
		canonicalUrl: `${BASE_URL}/`,
	});

type View = "home" | "init" | "commit" | "related";

export default function Home() {
	const [view, setView] = useState<View>("home");
	const { t } = useLanguage();

	return (
		<div className="page">
			<AnimatePresence mode="wait" initial={true}>
				{view === "home" && <HomeView key="home" onSelect={setView} />}
				{view === "init" && (
					<CommandDetail
						key="init"
						{...t.initData}
						onBack={() => setView("home")}
					/>
				)}
				{view === "commit" && (
					<CommandDetail
						key="commit"
						{...t.commitData}
						onBack={() => setView("home")}
					/>
				)}
				{view === "related" && (
					<CommandDetail
						key="related"
						{...t.relatedData}
						onBack={() => setView("home")}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
