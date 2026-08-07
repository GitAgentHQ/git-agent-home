import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { MetaFunction } from "react-router";
import { HomeView } from "../components/home-view";
import { CommandDetail } from "../components/command-detail";
import { buildMeta } from "../lib/meta";
import { BASE_URL } from "../lib/constants";
import { useLanguage } from "../contexts/language-context";

const HOME_DESCRIPTION =
	"AI-first Git CLI: conventional commits and atomic splits. Official release binaries use a free shared gateway with zero config; bring your own key via ~/.config/git-agent/config.yml, and use --api-key/--base-url/--model for explicit overrides or --free to force the free shared gateway.";

export const meta: MetaFunction = () =>
	buildMeta({
		title: "git-agent | Conventional commits CLI",
		description: HOME_DESCRIPTION,
		canonicalUrl: `${BASE_URL}/`,
	});

type View = "home" | "init" | "commit" | "related" | "status" | "skills" | "config";

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
				{view === "status" && (
					<CommandDetail
						key="status"
						{...t.statusData}
						onBack={() => setView("home")}
					/>
				)}
				{view === "skills" && (
					<CommandDetail
						key="skills"
						{...t.skillsData}
						onBack={() => setView("home")}
					/>
				)}
				{view === "config" && (
					<CommandDetail
						key="config"
						{...t.configData}
						onBack={() => setView("home")}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
