import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { motionDuration, motionEase, useAccessibleMotion, useTimedReveal } from "../utils/motion-prefs";

interface LeafNode {
	id: string;
	x: number;
	y: number;
	label: string;
	score: string;
	labelY: number;
	scoreY: number;
}

const HUB = { x: 220, y: 110, id: "app/core.ts" };

// The clockwise order reads like one query moving through known relationships.
const LEAF_NODES: LeafNode[] = [
	{
		id: "app/core.test.ts",
		x: 75,
		y: 50,
		label: "app/core.test.ts",
		score: "94% coupled",
		labelY: -16,
		scoreY: 22,
	},
	{
		id: "CHANGELOG.md",
		x: 365,
		y: 50,
		label: "CHANGELOG.md",
		score: "88% coupled",
		labelY: -16,
		scoreY: 22,
	},
	{
		id: "app/worker.ts",
		x: 365,
		y: 170,
		label: "app/worker.ts",
		score: "62% coupled",
		labelY: 22,
		scoreY: -14,
	},
	{
		id: "docs/api.md",
		x: 75,
		y: 170,
		label: "docs/api.md",
		score: "76% coupled",
		labelY: 22,
		scoreY: -14,
	},
];

const EDGES = LEAF_NODES.map((node) => ({ from: HUB, to: node }));

interface SignalFrame {
	x: number;
	y: number;
	opacity: number;
	at: number;
}

const SIGNAL_LEAD_IN = 0.18;
const SIGNAL_FADE_IN = 0.08;
const SIGNAL_TRAVEL = 0.56;
const SIGNAL_ARRIVAL_HOLD = 0.12;
const SIGNAL_FADE_OUT = 0.1;
const SIGNAL_RESET = 0.24;
const SIGNAL_SLOT =
	SIGNAL_FADE_IN + SIGNAL_TRAVEL + SIGNAL_ARRIVAL_HOLD + SIGNAL_FADE_OUT + SIGNAL_RESET;
const SIGNAL_SCAN_REST = 0.35;
const SIGNAL_SCAN_DURATION = SIGNAL_LEAD_IN + SIGNAL_SLOT * LEAF_NODES.length + SIGNAL_SCAN_REST;
const SIGNAL_ARRIVAL_TIMES = LEAF_NODES.map(
	(_, index) => SIGNAL_LEAD_IN + index * SIGNAL_SLOT + SIGNAL_FADE_IN + SIGNAL_TRAVEL,
);
const RELATION_PRINT_DURATION = 0.28;
const EDGE_TRACE_DURATION = SIGNAL_TRAVEL + SIGNAL_ARRIVAL_HOLD + SIGNAL_FADE_OUT;

const SIGNAL_FRAMES: SignalFrame[] = [
	{ x: HUB.x, y: HUB.y, opacity: 0, at: 0 },
	...LEAF_NODES.flatMap((node, index) => {
		const start = SIGNAL_LEAD_IN + index * SIGNAL_SLOT;
		const arrives = start + SIGNAL_FADE_IN + SIGNAL_TRAVEL;
		return [
			{ x: HUB.x, y: HUB.y, opacity: 0, at: start },
			{ x: HUB.x, y: HUB.y, opacity: 0.86, at: start + SIGNAL_FADE_IN },
			{ x: node.x, y: node.y, opacity: 0.86, at: arrives },
			{ x: node.x, y: node.y, opacity: 0.86, at: arrives + SIGNAL_ARRIVAL_HOLD },
			{ x: node.x, y: node.y, opacity: 0, at: arrives + SIGNAL_ARRIVAL_HOLD + SIGNAL_FADE_OUT },
		];
	}),
	{ x: HUB.x, y: HUB.y, opacity: 0, at: SIGNAL_SCAN_DURATION },
];
const SIGNAL_TIMES = SIGNAL_FRAMES.map(({ at }) => at / SIGNAL_SCAN_DURATION);
const SIGNAL_X = SIGNAL_FRAMES.map(({ x }) => x);
const SIGNAL_Y = SIGNAL_FRAMES.map(({ y }) => y);
const SIGNAL_OPACITY = SIGNAL_FRAMES.map(({ opacity }) => opacity);

const HUB_EMIT_FRAMES = [
	{ scale: 1, opacity: 0, at: 0 },
	...LEAF_NODES.flatMap((_, index) => {
		const start = SIGNAL_LEAD_IN + index * SIGNAL_SLOT;
		return [
			{ scale: 1, opacity: 0, at: start },
			{ scale: 1.25, opacity: 0.26, at: start + 0.06 },
			{ scale: 1.7, opacity: 0, at: start + 0.22 },
		];
	}),
	{ scale: 1, opacity: 0, at: SIGNAL_SCAN_DURATION },
];
const HUB_EMIT_TIMES = HUB_EMIT_FRAMES.map(({ at }) => at / SIGNAL_SCAN_DURATION);
const HUB_EMIT_SCALE = HUB_EMIT_FRAMES.map(({ scale }) => scale);
const HUB_EMIT_OPACITY = HUB_EMIT_FRAMES.map(({ opacity }) => opacity);

/**
 * Mini co-change graph: files that habitually change together, drawn from git
 * history. `core.ts` is the hub; dashed edges are co-change couplings surfaced
 * by `related`. The hub emits one signal at a time; each arrival traces its
 * edge and prints that file's relationship data into place.
 *
 * Decorative (aria-hidden); respects reduced motion and runs once when first
 * visible, leaving a quiet static diagram behind.
 */
export function CoChangeGraph() {
	const reduced = useAccessibleMotion();
	const { shown } = useTimedReveal({ delay: 1.2 });
	const graphRef = useRef<HTMLDivElement>(null);
	const inView = useInView(graphRef, { amount: 0.25, once: true });
	const animate = !reduced && shown && inView;

	return (
		<motion.div
			className="cochange-graph"
			ref={graphRef}
			aria-hidden="true"
			initial={reduced ? false : { opacity: 0, y: 10 }}
			animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
			transition={{
				duration: reduced ? 0 : motionDuration(0.6),
				ease: motionEase,
			}}
		>
			<svg viewBox="0 0 440 220" width="100%" height="auto" focusable="false">
				<defs>
					{LEAF_NODES.map((node, index) => (
						<clipPath id={`cochange-data-${index}`} key={`cochange-data-${node.id}`}>
							<rect x={node.x - 96} y={node.y - 30} width={192} height={60} />
						</clipPath>
					))}
				</defs>

				{/* Dashed edge lines */}
				{EDGES.map(({ from, to }, i) => (
					<line
						key={`edge-${i}`}
						x1={from.x}
						y1={from.y}
						x2={to.x}
						y2={to.y}
						className="cochange-edge"
					/>
				))}

				{animate && (
					<g transform={`translate(${HUB.x}, ${HUB.y})`}>
						<motion.circle
							className="cochange-hub-emit"
							r={12}
							initial={{ scale: 1, opacity: 0 }}
							animate={{ scale: HUB_EMIT_SCALE, opacity: HUB_EMIT_OPACITY }}
							transition={{
								duration: motionDuration(SIGNAL_SCAN_DURATION),
								times: HUB_EMIT_TIMES,
								ease: motionEase,
							}}
						/>
					</g>
				)}

				{animate &&
					EDGES.map(({ from, to }, index) => (
						<motion.line
							key={`cochange-edge-trace-${to.id}`}
							className="cochange-edge-trace"
							x1={from.x}
							y1={from.y}
							x2={to.x}
							y2={to.y}
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.72, 0.72, 0] }}
							transition={{
								duration: motionDuration(EDGE_TRACE_DURATION),
								times: [0, SIGNAL_TRAVEL / EDGE_TRACE_DURATION, (SIGNAL_TRAVEL + SIGNAL_ARRIVAL_HOLD) / EDGE_TRACE_DURATION, 1],
								delay: motionDuration(
									SIGNAL_LEAD_IN + index * SIGNAL_SLOT + SIGNAL_FADE_IN,
								),
								ease: motionEase,
							}}
						/>
					))}

				{animate && (
					<motion.g
						key="cochange-signal"
						className="cochange-signal"
						initial={{ x: HUB.x, y: HUB.y, opacity: 0 }}
						animate={{ x: SIGNAL_X, y: SIGNAL_Y, opacity: SIGNAL_OPACITY }}
						transition={{
							duration: motionDuration(SIGNAL_SCAN_DURATION),
							times: SIGNAL_TIMES,
							ease: motionEase,
						}}
					>
						<circle r={4} fill="none" stroke="#111" strokeWidth={1} />
						<circle r={2} />
					</motion.g>
				)}

				{/* Central Hub Node */}
				<g className="cochange-hub-node">
					{/* Hub file pill badge */}
					<rect
						x={HUB.x - 52}
						y={HUB.y - 40}
						width={104}
						height={22}
						rx={3}
						className="cochange-hub-badge-bg"
					/>
					<text
						x={HUB.x}
						y={HUB.y - 25}
						textAnchor="middle"
						className="cochange-hub-badge-text"
					>
						{HUB.id}
					</text>

					{/* Hub graphic */}
					<circle cx={HUB.x} cy={HUB.y} r={12} className="cochange-hub-outer" />
					<circle cx={HUB.x} cy={HUB.y} r={5.5} className="cochange-hub-inner" />
					<circle cx={HUB.x} cy={HUB.y} r={2} fill="#f0ede6" />

					{/* Hub role tag */}
					<text x={HUB.x} y={HUB.y + 24} textAnchor="middle" className="cochange-hub-tag">
						[HUB FILE]
					</text>
				</g>

				{/* Coupled Leaf Nodes */}
				{LEAF_NODES.map((n, index) => (
					<g key={n.id} className="cochange-leaf-node">
						{/* Leaf graphic */}
						<rect
							x={n.x - 7}
							y={n.y - 7}
							width={14}
							height={14}
							rx={3}
							className="cochange-leaf-bg"
						/>
						<circle cx={n.x} cy={n.y} r={2.5} className="cochange-leaf-dot" />

						<motion.g
							className="cochange-relation-data"
							clipPath={`url(#cochange-data-${index})`}
							initial={reduced ? false : { y: 10, opacity: 0 }}
							animate={reduced || animate ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
							transition={{
								duration: reduced ? 0 : motionDuration(RELATION_PRINT_DURATION),
								delay: reduced ? 0 : motionDuration(SIGNAL_ARRIVAL_TIMES[index]),
								ease: motionEase,
							}}
						>
							<text
								x={n.x}
								y={n.y + n.labelY}
								textAnchor="middle"
								className="cochange-node-label"
							>
								{n.label}
							</text>
							<text x={n.x} y={n.y + n.scoreY} textAnchor="middle" className="cochange-score">
								{n.score}
							</text>
						</motion.g>
					</g>
				))}
			</svg>
		</motion.div>
	);
}
