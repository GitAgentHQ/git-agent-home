import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { motionDuration, motionEase, useAccessibleMotion } from "../utils/motion-prefs";

const MotionLink = motion(Link);
import { Barcode } from "./barcode";
import type { BarConfig } from "./barcode";
import { DotsCircle, DotsNoiseFilter, DotsSquare } from "./pattern";
import { HomeFooter } from "./home-footer";
import { LangSwitch } from "./lang-switch";
import { useLanguage } from "../contexts/language-context";

interface HomeViewProps {
	onSelect: (cmd: "init" | "commit") => void;
}

/* 12 bars + 11×1px gap ≈ 44px; heights 22–30px for a lighter silhouette */
const BARS_INIT: BarConfig[] = [
	{ width: 3, height: 26 },
	{ width: 3, height: 24 },
	{ width: 3, height: 28 },
	{ width: 3, height: 22 },
	{ width: 3, height: 30 },
	{ width: 3, height: 24 },
	{ width: 3, height: 26 },
	{ width: 2, height: 28 },
	{ width: 3, height: 22 },
	{ width: 2, height: 30 },
	{ width: 3, height: 24 },
	{ width: 2, height: 28 },
];

const BARS_COMMIT: BarConfig[] = [
	{ width: 3, height: 26 },
	{ width: 3, height: 22 },
	{ width: 3, height: 28 },
	{ width: 3, height: 24 },
	{ width: 3, height: 30 },
	{ width: 2, height: 22 },
	{ width: 3, height: 28 },
	{ width: 3, height: 24 },
	{ width: 2, height: 30 },
	{ width: 3, height: 22 },
	{ width: 3, height: 26 },
	{ width: 2, height: 28 },
];

// Cost for 1,000 commits at ~4,200 input + ~400 output tokens each.
// Based on actual usage data (255 commits, 1.17M tokens, $0.33 with Gemini 3.1 Flash Lite).
// Bar widths relative to Claude Opus 4.5 ($24.46 = 100%).
const PRICING_ROWS = [
	{ name: "Claude Opus 4.5",       cost: "$24.46", bar: 100 },
	{ name: "Claude Sonnet 4.6",     cost: "$14.67", bar: 60  },
	{ name: "GPT-5.4",               cost: "$12.89", bar: 53  },
	{ name: "Gemini 3.1 Pro",        cost: "$10.31", bar: 42  },
	{ name: "Gemini 3.1 Flash Lite", cost: "$1.29",  bar: 5   },
];

function PricingCompare() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();

	return (
		<div className="pricing-compare">
			<h2 className="pricing-compare-title">{t.pricingTitle}</h2>
			<div className="pricing-compare-header">{t.pricingSubtitle}</div>
			<div className="pricing-compare-list">
				{PRICING_ROWS.map(({ name, cost, bar }, i) => (
					<div key={name} className="pricing-compare-row">
						<span className="pricing-compare-name">{name}</span>
						<div className="pricing-compare-track">
							<motion.div
								className="pricing-compare-bar"
								initial={reduced ? false : { scaleX: 0 }}
								{...(reduced
									? { animate: { scaleX: bar / 100 } }
									: {
											whileInView: { scaleX: bar / 100 },
											viewport: { once: true, margin: "-40px" },
										})}
								transition={{
									duration: reduced ? 0 : motionDuration(1.25),
									ease: motionEase,
									delay: reduced ? 0 : i * motionDuration(0.1),
								}}
							/>
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
			<p className="pricing-compare-note">{t.pricingNote}</p>
		</div>
	);
}

const entryGridContainer = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: motionDuration(0.1),
			delayChildren: motionDuration(0.06),
		},
	},
};

const entryGridItem = {
	hidden: { opacity: 0, y: 14 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: motionDuration(0.45), ease: motionEase },
	},
};

const exploreStagger = {
	hidden: {},
	visible: {
		transition: { staggerChildren: motionDuration(0.07), delayChildren: 0 },
	},
};

const exploreItem = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: motionDuration(0.4), ease: motionEase },
	},
};

export function HomeView({ onSelect }: HomeViewProps) {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();

	return (
		<motion.div
			className="home-view"
			initial={reduced ? false : { opacity: 0, y: 16 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { duration: reduced ? 0 : motionDuration(0.45), ease: motionEase },
			}}
			exit={{
				opacity: 0,
				y: -8,
				transition: { duration: reduced ? 0 : motionDuration(0.28), ease: motionEase },
			}}
		>
			<DotsNoiseFilter />
			<nav className="home-nav">
				<div className="home-nav-spacer" />
				<div className="home-nav-actions">
					<motion.a
						href="https://github.com/GitAgentHQ/git-agent-cli"
						target="_blank"
						rel="noopener noreferrer"
						className="home-nav-link"
						aria-label="View on GitHub"
						whileHover={reduced ? undefined : { color: "rgba(255,255,255,0.75)" }}
						transition={{ duration: 0.28, ease: motionEase }}
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
						</svg>
					</motion.a>
					<LangSwitch />
				</div>
			</nav>
			<header className="home-header">
				<h1 className="home-title">{t.homeTitle}</h1>
				<p className="home-subtitle">{t.homeSubtitle}</p>
			</header>

			<motion.div
				className="entry-grid"
				variants={reduced ? undefined : entryGridContainer}
				initial={reduced ? false : "hidden"}
				animate={reduced ? false : "visible"}
			>
				<motion.div
					className="entry-grid-cell"
					variants={reduced ? undefined : entryGridItem}
				>
					<EntryCard
						cmd="git-agent init"
						title={t.initTitle}
						description={t.initDescription}
						features={t.initFeatures}
						pattern={<DotsCircle />}
						bars={BARS_INIT}
						serial="GA-001"
						onClick={() => onSelect("init")}
						reducedMotion={reduced}
					/>
				</motion.div>
				<motion.div
					className="entry-grid-cell"
					variants={reduced ? undefined : entryGridItem}
				>
					<EntryCard
						cmd="git-agent commit"
						title={t.commitTitle}
						description={t.commitDescription}
						features={t.commitFeatures}
						pattern={<DotsSquare />}
						bars={BARS_COMMIT}
						serial="GA-002"
						onClick={() => onSelect("commit")}
						reducedMotion={reduced}
					/>
				</motion.div>
			</motion.div>

			<PricingCompare />
			<ExploreSection />
			<HomeFooter />
		</motion.div>
	);
}

function ExploreSection() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();

	const cards = [
		{
			href: "/for",
			name: t.exploreByLanguageName,
			desc: t.exploreByLanguageDesc,
		},
		{
			href: "/vs",
			name: t.exploreComparisonsName,
			desc: t.exploreComparisonsDesc,
		},
		{
			href: "/glossary",
			name: t.exploreGlossaryName,
			desc: t.exploreGlossaryDesc,
		},
		{
			href: "/templates",
			name: t.exploreTemplatesName,
			desc: t.exploreTemplatesDesc,
		},
	];

	const exploreLinks = cards.map((card) => (
		<MotionLink
			key={card.href}
			to={card.href}
			className="explore-card"
			{...(reduced ? {} : { variants: exploreItem })}
			whileHover={
				reduced
					? undefined
					: {
							borderColor: "rgba(255, 255, 255, 0.18)",
							background: "rgba(255, 255, 255, 0.07)",
							transition: { duration: 0.28, ease: motionEase },
						}
			}
		>
			<span className="explore-card-name">{card.name}</span>
			<span className="explore-card-desc">{card.desc}</span>
		</MotionLink>
	));

	return (
		<div className="explore-section">
			<p className="explore-title">{t.exploreTitle}</p>
			{reduced ? (
				<div className="explore-grid">{exploreLinks}</div>
			) : (
				<motion.div
					className="explore-grid"
					variants={exploreStagger}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-20px" }}
				>
					{exploreLinks}
				</motion.div>
			)}
		</div>
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
	onClick: () => void;
	reducedMotion: boolean;
}

function EntryCard({
	cmd,
	title,
	description,
	features,
	pattern,
	bars,
	serial,
	onClick,
	reducedMotion,
}: EntryCardProps) {
	const { t } = useLanguage();

	return (
		<motion.button
			type="button"
			className="entry-card"
			whileHover={reducedMotion ? undefined : "hover"}
			variants={{
				hover: {
					boxShadow: "0 14px 44px rgba(0,0,0,0.6)",
					transition: { duration: 0.28, ease: motionEase },
				},
			}}
			onClick={onClick}
		>
			<motion.div
				className="entry-card-lift"
				variants={{
					hover: {
						y: -4,
						scale: 1.01,
						transition: { duration: 0.28, ease: motionEase },
					},
				}}
				transition={{ duration: 0.28, ease: motionEase }}
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
					<span className="entry-card-cta">{t.viewDetails}</span>
					<Barcode bars={bars} />
				</footer>
			</motion.div>
		</motion.button>
	);
}
