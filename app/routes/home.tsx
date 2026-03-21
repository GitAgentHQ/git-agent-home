import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Route } from "./+types/home";
import { HomeView } from "../components/home-view";
import { CommandDetail } from "../components/command-detail";
import { useLanguage } from "../contexts/language-context";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "git-agent | AI-first Git CLI" },
		{
			name: "description",
			content:
				"AI-powered Git CLI that splits changes into atomic commits with conventional messages, powered by LLMs.",
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
