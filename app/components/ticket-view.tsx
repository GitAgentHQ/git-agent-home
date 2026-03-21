import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import type { BarConfig } from "./barcode";
import { TicketBarcode } from "./barcode";
import { DotsCircle, DotsSquare } from "./pattern";

const BARS_INIT: BarConfig[] = [
	{ width: 2, height: 30 },
	{ width: 1, height: 22 },
	{ width: 3, height: 40, tall: true },
	{ width: 1, height: 18 },
	{ width: 2, height: 35 },
	{ width: 1, height: 25, tall: true },
	{ width: 3, height: 44 },
	{ width: 2, height: 28 },
	{ width: 1, height: 20 },
	{ width: 2, height: 38, tall: true },
	{ width: 1, height: 24 },
	{ width: 3, height: 32 },
];

const BARS_COMMIT: BarConfig[] = [
	{ width: 1, height: 24 },
	{ width: 3, height: 42, tall: true },
	{ width: 2, height: 30 },
	{ width: 1, height: 36 },
	{ width: 2, height: 22 },
	{ width: 3, height: 46, tall: true },
	{ width: 1, height: 28 },
	{ width: 2, height: 34 },
	{ width: 3, height: 20 },
	{ width: 1, height: 44, tall: true },
	{ width: 2, height: 26 },
	{ width: 1, height: 38 },
];

const BARS_INSTALL: BarConfig[] = [
	{ width: 3, height: 36, tall: true },
	{ width: 1, height: 24 },
	{ width: 2, height: 42 },
	{ width: 1, height: 20 },
	{ width: 3, height: 30 },
	{ width: 2, height: 44, tall: true },
	{ width: 1, height: 26 },
	{ width: 3, height: 38 },
	{ width: 2, height: 22 },
	{ width: 1, height: 40, tall: true },
	{ width: 3, height: 28 },
	{ width: 2, height: 34 },
];

interface TicketData {
	cmd: string;
	serialLabel: string;
	serialNum: string;
	title: string[];
	description: string;
	features: string[];
	codeExample: string;
	pattern: ReactNode;
	bars: BarConfig[];
	delay: number;
}

const TICKETS: TicketData[] = [
	{
		cmd: "git-agent init",
		serialLabel: "GA / INIT",
		serialNum: "0001",
		title: ["Initialize", "your repo"],
		description:
			"Analyze commit history and project structure to derive meaningful scopes. Install git hooks for automated validation.",
		features: [
			"AI-derived commit scopes",
			"Git hook installation",
			"Conventional commits validator",
			"Project config generation",
		],
		codeExample: "git-agent init --scope",
		pattern: <DotsCircle />,
		bars: BARS_INIT,
		delay: 0.05,
	},
	{
		cmd: "git-agent commit",
		serialLabel: "GA / COMMIT",
		serialNum: "0002",
		title: ["Generate", "smart", "commits"],
		description:
			"Analyze staged changes, split into atomic commits, and generate conventional messages with LLM-powered intelligence.",
		features: [
			"Multi-commit splitting",
			"Conventional Commits format",
			"Hook validation + retry",
			"Dry-run preview",
		],
		codeExample: "git-agent commit --dry-run",
		pattern: <DotsSquare />,
		bars: BARS_COMMIT,
		delay: 0.15,
	},
	{
		cmd: "brew install git-agent",
		serialLabel: "GA / SETUP",
		serialNum: "0003",
		title: ["Install", "& configure"],
		description:
			"Install via Homebrew and configure your AI provider to get started in minutes. Supports macOS and Linux.",
		features: [
			"macOS + Linux support",
			"Config file setup",
			"API key management",
			"Zero runtime dependencies",
		],
		codeExample: "brew install git-agent",
		pattern: <DotsSquare circle />,
		bars: BARS_INSTALL,
		delay: 0.25,
	},
];

export function TicketView() {
	return (
		<motion.div
			className="ticket-view"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, y: -16 }}
			transition={{ duration: 1, ease: "easeInOut" }}
		>
			<nav className="ticket-nav">
				<Link to="/" className="ticket-back">
					← back
				</Link>
				<span className="ticket-nav-title">git-agent</span>
			</nav>

			<div className="ticket-grid">
				{TICKETS.map((ticket, i) => (
					<TicketCard key={i} {...ticket} />
				))}
			</div>
		</motion.div>
	);
}

function TicketCard({
	cmd,
	serialLabel,
	serialNum,
	title,
	description,
	features,
	codeExample,
	pattern,
	bars,
	delay,
}: TicketData) {
	return (
		<motion.article
			className="ticket"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -16 }}
			transition={{ type: "spring", damping: 32, stiffness: 50, delay, duration: 1.2 }}
		>
			<div className="ticket-header">
				<div className="ticket-title-block">
					{title.map((line, i) => (
						<span key={i}>{line}</span>
					))}
				</div>
				<div className="ticket-meta-block">
					<span className="ticket-meta-cmd">{cmd}</span>
					<span className="ticket-meta-serial">{serialLabel}</span>
				</div>
			</div>

			<div className="ticket-content">
				<p className="ticket-desc">{description}</p>
				<ul className="ticket-features">
					{features.map((f, i) => (
						<li key={i}>{f}</li>
					))}
				</ul>
				<div className="ticket-code">
					<code>$ {codeExample}</code>
				</div>
			</div>

			<div className="ticket-graphic">{pattern}</div>

			<div className="ticket-dotted-divider" aria-hidden="true" />

			<footer className="ticket-footer-full">
				<div className="ticket-serial-numbers">
					<span>{serialNum}</span>
					<span>{serialLabel.replace(" / ", "-")}</span>
				</div>
				<TicketBarcode bars={bars} />
			</footer>
		</motion.article>
	);
}
