import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Route } from "./+types/home";
import { HomeView } from "../components/home-view";
import { CommandDetail } from "../components/command-detail";
import { useLanguage } from "../contexts/language-context";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "git-agent | Conventional commits CLI" },
		{
			name: "description",
			content:
				"AI-first Git CLI: conventional commits and atomic splits. Prefer official FREE (no provider flags), then ~/.config/git-agent/config.yml; use --api-key/--base-url/--model only for explicit overrides.",
		},
	];
}

type View = "home" | "init" | "commit";

export default function Home() {
	const [view, setView] = useState<View>("home");
	const { t } = useLanguage();

	return (
		<div className="page">
			<AnimatePresence mode="wait" initial={false}>
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
			</AnimatePresence>
		</div>
	);
}
