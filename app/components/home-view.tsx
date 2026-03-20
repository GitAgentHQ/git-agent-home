import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Barcode } from "./barcode";
import type { BarConfig } from "./barcode";
import { DotsCircle, DotsNoiseFilter, DotsSquare } from "./pattern";

interface HomeViewProps {
	onSelect: (cmd: "init" | "commit") => void;
}

const BARS_INIT: BarConfig[] = [
	{ width: 2, height: 28 },
	{ width: 1, height: 20 },
	{ width: 3, height: 36 },
	{ width: 1, height: 24 },
	{ width: 2, height: 32 },
	{ width: 1, height: 18 },
	{ width: 3, height: 40 },
	{ width: 2, height: 28 },
	{ width: 1, height: 22 },
	{ width: 2, height: 34 },
	{ width: 1, height: 26 },
	{ width: 3, height: 38 },
];

const BARS_COMMIT: BarConfig[] = [
	{ width: 1, height: 22 },
	{ width: 3, height: 38 },
	{ width: 2, height: 28 },
	{ width: 1, height: 34 },
	{ width: 2, height: 20 },
	{ width: 3, height: 42 },
	{ width: 1, height: 26 },
	{ width: 2, height: 32 },
	{ width: 3, height: 18 },
	{ width: 1, height: 40 },
	{ width: 2, height: 24 },
	{ width: 1, height: 36 },
];

// Cost for 1,000 commits at 3,118 input + 233 output tokens each.
// Bar widths relative to Claude Opus 4.5 ($21.42 = 100%).
const PRICING_ROWS = [
	{ name: "Claude Opus 4.5",     cost: "$21.42", bar: 100 },
	{ name: "Claude Sonnet 4.6",   cost: "$12.85", bar: 60  },
	{ name: "GPT-5.4",             cost: "$11.29", bar: 53  },
	{ name: "Gemini 3.1 Pro",      cost: "$9.03",  bar: 42  },
	{ name: "Gemini 3.1 Flash Lite", cost: "$1.13", bar: 5   },
];

function PricingCompare() {
	return (
		<div className="pricing-compare">
			<h2 className="pricing-compare-title">Why git-agent</h2>
			<div className="pricing-compare-header">cost per 1,000 commits</div>
			<div className="pricing-compare-list">
				{PRICING_ROWS.map(({ name, cost, bar }) => (
					<div key={name} className="pricing-compare-row">
						<span className="pricing-compare-name">{name}</span>
						<div className="pricing-compare-track">
							<div className="pricing-compare-bar" style={{ width: `${bar}%` }} />
						</div>
						<span className="pricing-compare-cost">{cost}</span>
					</div>
				))}
				<div className="pricing-compare-row pricing-compare-row--free">
					<span className="pricing-compare-name">git-agent</span>
					<div className="pricing-compare-track" />
					<span className="pricing-compare-cost pricing-compare-cost--free">free</span>
				</div>
			</div>
			<p className="pricing-compare-note">3,118 input + 233 output per commit. Source: official provider pricing pages, Mar 2026.</p>
		</div>
	);
}

export function HomeView({ onSelect }: HomeViewProps) {
	return (
		<motion.div
			className="home-view"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, y: -16 }}
			transition={{ duration: 0.25, ease: "easeInOut" }}
		>
			<DotsNoiseFilter />
			<header className="home-header">
				<h1 className="home-title">git-agent</h1>
				<p className="home-subtitle">
					AI-first Git CLI. Automated conventional commits, powered by LLMs.
				</p>
			</header>

			<div className="entry-grid">
				<EntryCard
					cmd="git-agent init"
					title={["Initialize", "your repo"]}
					description="Analyze commit history to derive scopes, install a pre-commit hook, and generate a .gitignore — all in one command."
					features={[
						"AI-derived commit scopes",
						"Built-in conventional commits hook",
						".gitignore generation",
						"Merge-safe config updates",
					]}
					pattern={<DotsCircle />}
					bars={BARS_INIT}
					serial="GA-001"
					delay={0.05}
					onClick={() => onSelect("init")}
				/>
				<EntryCard
					cmd="git-agent commit"
					title={["Generate", "smart commits"]}
					description="Stage all tracked changes, split into atomic commits, generate conventional messages, and validate with your pre-commit hook."
					features={[
						"Atomic commit splitting",
						"Conventional Commits format",
						"Hook validation + auto-retry",
						"Dry-run preview",
					]}
					pattern={<DotsSquare />}
					bars={BARS_COMMIT}
					serial="GA-002"
					delay={0.15}
					onClick={() => onSelect("commit")}
				/>
			</div>

			<PricingCompare />
		</motion.div>
	);
}

interface EntryCardProps {
	cmd: string;
	title: string[];
	description: string;
	features: string[];
	pattern: ReactNode;
	bars: BarConfig[];
	serial: string;
	delay: number;
	onClick: () => void;
}

function EntryCard({
	cmd,
	title,
	description,
	features,
	pattern,
	bars,
	serial,
	delay,
	onClick,
}: EntryCardProps) {
	return (
		<motion.button
			className="entry-card"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ type: "spring", damping: 20, stiffness: 100, delay }}
			whileHover={{ y: -6, scale: 1.01 }}
			onClick={onClick}
		>
			<div className="entry-card-header">
				<code className="entry-card-cmd">{cmd}</code>
				<span className="entry-card-serial">{serial}</span>
			</div>

			<div className="entry-card-title">
				{title.map((line, i) => (
					<span key={i}>{line}</span>
				))}
			</div>

			<p className="entry-card-desc">{description}</p>

			<ul className="entry-card-features">
				{features.map((f, i) => (
					<li key={i}>{f}</li>
				))}
			</ul>

			<div className="entry-card-graphic">{pattern}</div>

			<div className="entry-card-divider" aria-hidden="true" />

			<footer className="entry-card-footer">
				<span className="entry-card-cta">View details →</span>
				<Barcode bars={bars} />
			</footer>
		</motion.button>
	);
}
