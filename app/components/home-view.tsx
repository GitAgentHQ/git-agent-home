import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { motionDuration, motionEase, useAccessibleMotion, useTimedReveal } from "../utils/motion-prefs";
import { renderInlineDocText } from "../utils/inline-doc-text";

const MotionLink = motion.create(Link);
import { CodeBlock } from "./code-block";
import { Barcode } from "./barcode";
import type { BarConfig } from "./barcode";
import { DotsPattern } from "./pattern";
import type { EntryPatternMotion } from "./pattern";
import { CoChangeGraph } from "./cochange-graph";
import { HomeFooter } from "./home-footer";
import { LangSwitch } from "./lang-switch";
import { ProofStrip } from "./proof-strip";
import { useLanguage } from "../contexts/language-context";
import { GITHUB_URL, INSTALL_URL } from "../lib/constants";

const COLOR_WHITE_75 = "rgba(255, 255, 255, 0.75)";
const COLOR_WHITE_18 = "rgba(255, 255, 255, 0.18)";
const COLOR_WHITE_07 = "rgba(255, 255, 255, 0.07)";
const SHADOW_CARD_HOVER = "0 14px 44px rgba(0, 0, 0, 0.6)";

interface HomeViewProps {
	onSelect: (cmd: "init" | "commit" | "related" | "status" | "skills" | "config") => void;
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

const BARS_RELATED: BarConfig[] = [
	{ width: 2, height: 28 },
	{ width: 3, height: 24 },
	{ width: 3, height: 30 },
	{ width: 2, height: 22 },
	{ width: 3, height: 26 },
	{ width: 3, height: 28 },
	{ width: 2, height: 24 },
	{ width: 3, height: 30 },
	{ width: 3, height: 22 },
	{ width: 2, height: 28 },
	{ width: 3, height: 26 },
	{ width: 3, height: 24 },
];

const BARS_STATUS: BarConfig[] = [
	{ width: 3, height: 24 },
	{ width: 2, height: 30 },
	{ width: 3, height: 22 },
	{ width: 3, height: 28 },
	{ width: 2, height: 26 },
	{ width: 3, height: 24 },
	{ width: 3, height: 30 },
	{ width: 2, height: 22 },
	{ width: 3, height: 28 },
	{ width: 3, height: 24 },
	{ width: 2, height: 30 },
	{ width: 3, height: 26 },
];

const BARS_SKILLS: BarConfig[] = [
	{ width: 2, height: 22 },
	{ width: 3, height: 28 },
	{ width: 2, height: 24 },
	{ width: 3, height: 30 },
	{ width: 3, height: 22 },
	{ width: 2, height: 26 },
	{ width: 3, height: 28 },
	{ width: 2, height: 30 },
	{ width: 3, height: 24 },
	{ width: 3, height: 22 },
	{ width: 2, height: 28 },
	{ width: 3, height: 26 },
];

const BARS_CONFIG: BarConfig[] = [
	{ width: 3, height: 30 },
	{ width: 2, height: 22 },
	{ width: 3, height: 26 },
	{ width: 3, height: 24 },
	{ width: 2, height: 28 },
	{ width: 3, height: 22 },
	{ width: 2, height: 30 },
	{ width: 3, height: 24 },
	{ width: 3, height: 28 },
	{ width: 2, height: 26 },
	{ width: 3, height: 22 },
	{ width: 3, height: 30 },
];

// Cost for 1,000 commits at ~4,200 input + ~400 output tokens each.
// Based on actual usage data (255 commits, 1.17M tokens, $0.33 with Gemini 3.1 Flash Lite).
// Bar widths relative to Claude Fable 5 ($62.00 = 100%). Source: provider pricing pages, Aug 2026.
const PRICING_ROWS = [
	{ name: "Claude Fable 5",     cost: "$62.00", bar: 100 },
	{ name: "Claude Opus 5",      cost: "$31.00", bar: 50  },
	{ name: "Claude Sonnet 5",    cost: "$18.60", bar: 30  },
	{ name: "GPT-5.6 (sol)",      cost: "$33.00", bar: 53  },
	{ name: "Gemini 3.6 Flash",   cost: "$9.30",  bar: 15  },
];

function PricingCompare() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();
	const { shown } = useTimedReveal({ delay: 1.4 });

	return (
		<motion.section
			className="pricing-compare"
			initial={reduced ? false : { opacity: 0, y: 12 }}
			animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
			transition={{
				duration: reduced ? 0 : motionDuration(0.5),
				ease: motionEase,
			}}
		>
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
								animate={reduced || shown ? { scaleX: bar / 100 } : { scaleX: 0 }}
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
		</motion.section>
	);
}

function GraphPitch() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();
	const { shown } = useTimedReveal({ delay: 1.0 });

	return (
		<motion.section
			className="graph-pitch"
			initial={reduced ? false : { opacity: 0, y: 12 }}
			animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
			transition={{
				duration: reduced ? 0 : motionDuration(0.5),
				ease: motionEase,
			}}
		>
			<motion.h2
				className="graph-pitch-title"
				initial={reduced ? false : { opacity: 0, y: 12 }}
				animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
				transition={{
					duration: reduced ? 0 : motionDuration(0.5),
					ease: motionEase,
				}}
			>
				{t.graphPitchTitle}
			</motion.h2>
			<motion.p
				className="graph-pitch-body"
				initial={reduced ? false : { opacity: 0, y: 10 }}
				animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
				transition={{
					duration: reduced ? 0 : motionDuration(0.5),
					ease: motionEase,
					delay: reduced ? 0 : motionDuration(0.08),
				}}
			>
				{renderInlineDocText(t.graphPitchBody)}
			</motion.p>
			<CoChangeGraph />
		</motion.section>
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
	hidden: { opacity: 0, y: 18, rotate: -0.6 },
	visible: {
		opacity: 1,
		y: 0,
		rotate: 0,
		transition: { duration: motionDuration(0.5), ease: motionEase },
	},
};

const exploreStagger = {
	hidden: {},
	visible: {
		transition: { staggerChildren: motionDuration(0.07), delayChildren: 0 },
	},
};

const exploreItem = {
	hidden: { opacity: 0, x: 16 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: motionDuration(0.42), ease: motionEase },
	},
};

function InstallCopyBlock() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();

	return (
		<motion.div
			className="home-install"
			initial={reduced ? false : { opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: reduced ? 0 : motionDuration(0.55),
				ease: motionEase,
				delay: reduced ? 0 : motionDuration(0.66),
			}}
		>
			<p className="home-install-hint">{t.homeInstallHint}</p>
			<CodeBlock code={t.homeInstallCopyLine} copyable />
			<a className="home-install-alt" href={INSTALL_URL}>
				{t.homeInstallAlt}
			</a>
		</motion.div>
	);
}

/**
 * Terminal-boot title: a `$` prompt, then the product name types out
 * char-by-char with a blinking block caret that stays after typing finishes.
 * One authored focal moment — respects reduced-motion (renders full title,
 * no typing, caret hidden).
 */
function HeroTitle() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();
	const title = t.homeTitle;
	const chars = title.split("");

	if (reduced) {
		return (
			<h1 className="home-title">
				<span className="home-title-prompt" aria-hidden="true">
					$
				</span>
				{title}
			</h1>
		);
	}

	return (
		<motion.h1
			className="home-title"
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: motionDuration(0.4), ease: motionEase }}
		>
			<span className="home-title-prompt" aria-hidden="true">
				$
			</span>
			{chars.map((ch, i) => (
				<motion.span
					key={i}
					className="home-title-char"
					aria-hidden="true"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.01,
						delay: i * motionDuration(0.055),
					}}
				>
					{ch}
				</motion.span>
			))}
			<span className="home-title-caret" aria-hidden="true" />
			<span className="home-title-sr">{title}</span>
		</motion.h1>
	);
}

export function HomeView({ onSelect }: HomeViewProps) {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();
	const { shown: gridShown } = useTimedReveal({ delay: 1.8 });

	return (
		<motion.main
			className="home-view"
			id="main-content"
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
			<nav className="home-nav">
				<div className="home-nav-spacer" />
				<div className="home-nav-actions">
					<motion.a
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="home-nav-link"
						aria-label={t.viewOnGitHub}
						whileHover={reduced ? undefined : { color: COLOR_WHITE_75 }}
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
				<HeroTitle />
				<motion.p
					className="home-subtitle"
					initial={reduced ? false : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: reduced ? 0 : motionDuration(0.55),
						ease: motionEase,
						delay: reduced ? 0 : motionDuration(0.58),
					}}
				>
					{t.homeSubtitle}
				</motion.p>
				<InstallCopyBlock />
			</header>
			<ProofStrip />
			<GraphPitch />
			<PricingCompare />

			<motion.div
				className="entry-grid"
				variants={reduced ? undefined : entryGridContainer}
				initial={reduced ? false : "hidden"}
				animate={reduced || gridShown ? "visible" : "hidden"}
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
						pattern={<DotsPattern motion="init" shape="seed" />}
						graphicMotion="init"
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
						pattern={<DotsPattern motion="commit" shape="ledger" />}
						graphicMotion="commit"
						bars={BARS_COMMIT}
						serial="GA-002"
						onClick={() => onSelect("commit")}
						reducedMotion={reduced}
					/>
				</motion.div>
				<motion.div
					className="entry-grid-cell"
					variants={reduced ? undefined : entryGridItem}
				>
					<EntryCard
						cmd="git-agent related"
						title={t.relatedTitle}
						description={t.relatedDescription}
						features={t.relatedFeatures}
						pattern={<DotsPattern motion="related" shape="diamond" />}
						graphicMotion="related"
						bars={BARS_RELATED}
						serial="GA-003"
						onClick={() => onSelect("related")}
						reducedMotion={reduced}
					/>
				</motion.div>
				<motion.div
					className="entry-grid-cell"
					variants={reduced ? undefined : entryGridItem}
				>
					<EntryCard
						cmd="git-agent status"
						title={t.statusTitle}
						description={t.statusDescription}
						features={t.statusFeatures}
						pattern={<DotsPattern motion="status" shape="capsule" />}
						graphicMotion="status"
						bars={BARS_STATUS}
						serial="GA-004"
						onClick={() => onSelect("status")}
						reducedMotion={reduced}
					/>
				</motion.div>
				<motion.div
					className="entry-grid-cell"
					variants={reduced ? undefined : entryGridItem}
				>
					<EntryCard
						cmd="git-agent skills"
						title={t.skillsTitle}
						description={t.skillsDescription}
						features={t.skillsFeatures}
						pattern={<DotsPattern motion="skills" shape="hexagon" />}
						graphicMotion="skills"
						bars={BARS_SKILLS}
						serial="GA-005"
						onClick={() => onSelect("skills")}
						reducedMotion={reduced}
					/>
				</motion.div>
				<motion.div
					className="entry-grid-cell"
					variants={reduced ? undefined : entryGridItem}
				>
					<EntryCard
						cmd="git-agent config"
						title={t.configTitle}
						description={t.configDescription}
						features={t.configFeatures}
						pattern={<DotsPattern motion="config" shape="chamfer" />}
						graphicMotion="config"
						bars={BARS_CONFIG}
						serial="GA-006"
						onClick={() => onSelect("config")}
						reducedMotion={reduced}
					/>
				</motion.div>
			</motion.div>
			<ExploreSection />
			<HomeFooter />
		</motion.main>
	);
}

function ExploreSection() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();
	const { shown } = useTimedReveal({ delay: 2.2 });

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
		{
			href: "/integrations",
			name: t.exploreIntegrationsName,
			desc: t.exploreIntegrationsDesc,
		},
		{
			href: "/use-cases",
			name: t.exploreUseCasesName,
			desc: t.exploreUseCasesDesc,
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
							borderColor: COLOR_WHITE_18,
							background: COLOR_WHITE_07,
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
			<h2 className="explore-title">{t.exploreTitle}</h2>
			{reduced ? (
				<div className="explore-grid">{exploreLinks}</div>
			) : (
				<motion.div
					className="explore-grid"
					variants={exploreStagger}
					initial="hidden"
					animate={shown ? "visible" : "hidden"}
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
	graphicMotion: EntryPatternMotion;
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
	graphicMotion,
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
			data-entry-motion={graphicMotion}
			whileHover={reducedMotion ? undefined : "hover"}
			whileFocus={reducedMotion ? undefined : "hover"}
			variants={{
				hover: {
					boxShadow: SHADOW_CARD_HOVER,
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
