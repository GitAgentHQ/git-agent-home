import { AnimatePresence } from "motion/react";
import type { MetaFunction } from "react-router";
import { useSearchParams } from "react-router";
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

const VIEWS: View[] = ["init", "commit", "related", "status", "skills", "config"];

function isView(v: string | null): v is View {
	return v !== null && (v === "home" || (VIEWS as string[]).includes(v));
}

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { t } = useLanguage();

	const raw = searchParams.get("cmd");
	const view: View = isView(raw) ? raw : "home";

	const open = (cmd: View) => {
		const next = new URLSearchParams(searchParams);
		const lang = next.get("lang");
		next.delete("cmd");
		if (cmd !== "home") {
			next.set("cmd", cmd);
		}
		if (lang) {
			next.set("lang", lang);
		}
		// Keep `cmd`/`lang` in the URL so back-button, deep-link, and
		// language state all survive navigation.
		setSearchParams(next, { replace: cmd === "home" });
	};

	return (
		<div className="page">
			<AnimatePresence mode="wait" initial={true}>
				{view === "home" && <HomeView key="home" onSelect={open} />}
				{view === "init" && (
					<CommandDetail key="init" {...t.initData} onBack={() => open("home")} />
				)}
				{view === "commit" && (
					<CommandDetail key="commit" {...t.commitData} onBack={() => open("home")} />
				)}
				{view === "related" && (
					<CommandDetail key="related" {...t.relatedData} onBack={() => open("home")} />
				)}
				{view === "status" && (
					<CommandDetail key="status" {...t.statusData} onBack={() => open("home")} />
				)}
				{view === "skills" && (
					<CommandDetail key="skills" {...t.skillsData} onBack={() => open("home")} />
				)}
				{view === "config" && (
					<CommandDetail key="config" {...t.configData} onBack={() => open("home")} />
				)}
			</AnimatePresence>
		</div>
	);
}
