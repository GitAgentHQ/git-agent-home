import { motion } from "motion/react";

import { motionDuration, motionEase, useAccessibleMotion, useTimedReveal } from "../utils/motion-prefs";

interface LeafNode {
	id: string;
	x: number;
	y: number;
	label: string;
	score: string;
	labelY: number;
	scoreY: number;
	seq: number;
}

const HUB = { x: 220, y: 110, id: "app/core.ts" };

// Sequence order (seq): 0 (top-left) -> 1 (top-right) -> 2 (bottom-right) -> 3 (bottom-left)
// Creates a calm, clockwise circular sweep radiating from the hub to coupled files.
const LEAF_NODES: LeafNode[] = [
	{
		id: "app/core.test.ts",
		x: 75,
		y: 50,
		label: "app/core.test.ts",
		score: "94% coupled",
		labelY: -16,
		scoreY: 22,
		seq: 0,
	},
	{
		id: "CHANGELOG.md",
		x: 365,
		y: 50,
		label: "CHANGELOG.md",
		score: "88% coupled",
		labelY: -16,
		scoreY: 22,
		seq: 1,
	},
	{
		id: "app/worker.ts",
		x: 365,
		y: 170,
		label: "app/worker.ts",
		score: "62% coupled",
		labelY: 22,
		scoreY: -14,
		seq: 2,
	},
	{
		id: "docs/api.md",
		x: 75,
		y: 170,
		label: "docs/api.md",
		score: "76% coupled",
		labelY: 22,
		scoreY: -14,
		seq: 3,
	},
];

const EDGES = LEAF_NODES.map((node) => {
	const dx = node.x - HUB.x;
	const dy = node.y - HUB.y;
	const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
	return {
		from: HUB,
		to: node,
		angle,
		seq: node.seq,
	};
});

/**
 * Master timing constants (in unscaled baseline seconds).
 * `motionDuration()` scales these according to `MOTION_TIME_SCALE` (1.5x)
 * to ensure calm, unhurried motion with ample breathing room.
 */
const TRAVEL_DURATION = 1.5;
const STAGGER_INTERVAL = 0.38;
const REPEAT_DELAY = 2.2;
const TOTAL_CYCLE = TRAVEL_DURATION + REPEAT_DELAY;

/**
 * Mini co-change graph: files that habitually change together, drawn from git
 * history. `core.ts` is the hub; dashed edges are co-change couplings surfaced
 * by `related`. Signal packets sweep smoothly clockwise from hub to leaf files,
 * echoing the agent's radiation of knowledge.
 *
 * Authored with a single clear focal idea (the signal packet glide), backed by
 * quiet, subtle hub emit and leaf arrival echoes, followed by a restful breathing gap.
 *
 * Decorative (aria-hidden); respects reduced-motion and pauses when offscreen.
 */
export function CoChangeGraph() {
	const reduced = useAccessibleMotion();
	const { shown } = useTimedReveal({ delay: 1.2 });
	const animate = !reduced && shown;

	return (
		<motion.div
			className="cochange-graph"
			aria-hidden="true"
			initial={reduced ? false : { opacity: 0, y: 10 }}
			animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
			transition={{
				duration: reduced ? 0 : motionDuration(0.6),
				ease: motionEase,
			}}
		>
			<svg viewBox="0 0 440 220" width="100%" height="auto" focusable="false">
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

				{/* Hub launch echoes — delicate, low-opacity expanding ripples */}
				{animate &&
					EDGES.map(({ seq }, i) => (
						<g key={`hub-ripple-group-${i}`} transform={`translate(${HUB.x}, ${HUB.y})`}>
							<motion.circle
								key={`hub-ripple-${i}`}
								r={6}
								fill="none"
								stroke="#111"
								strokeWidth={1}
								initial={{ scale: 1, opacity: 0 }}
								animate={{
									scale: [1, 2.2],
									opacity: [0.3, 0],
								}}
								transition={{
									duration: motionDuration(0.7),
									times: [0, 1],
									repeat: Infinity,
									repeatDelay: motionDuration(TOTAL_CYCLE - 0.7),
									delay: seq * motionDuration(STAGGER_INTERVAL),
									ease: "easeOut",
								}}
							/>
						</g>
					))}

				{/* Leaf node arrival echoes — subtle square response upon packet arrival */}
				{animate &&
					EDGES.map(({ to, seq }, i) => (
						<g key={`leaf-wake-group-${i}`} transform={`translate(${to.x}, ${to.y})`}>
							<motion.rect
								key={`leaf-wake-${i}`}
								x={-7}
								y={-7}
								width={14}
								height={14}
								rx={3}
								fill="none"
								stroke="#111"
								strokeWidth={1}
								initial={{ scale: 1, opacity: 0 }}
								animate={{
									scale: [1, 1.35],
									opacity: [0.35, 0],
								}}
								transition={{
									duration: motionDuration(0.65),
									times: [0, 1],
									repeat: Infinity,
									repeatDelay: motionDuration(TOTAL_CYCLE - 0.65),
									delay: seq * motionDuration(STAGGER_INTERVAL) + motionDuration(1.15),
									ease: "easeOut",
								}}
							/>
						</g>
					))}

				{/* Primary focal animation: Traveling signal packets with sleek tapered trails */}
				{animate &&
					EDGES.map(({ from, to, angle, seq }, i) => (
						<motion.g
							key={`pulse-${i}`}
							className="cochange-pulse"
							initial={{ x: from.x, y: from.y, opacity: 0 }}
							animate={{
								x: [from.x, to.x],
								y: [from.y, to.y],
								opacity: [0, 0.85, 0.85, 0],
							}}
							transition={{
								duration: motionDuration(TRAVEL_DURATION),
								times: [0, 0.12, 0.85, 1],
								repeat: Infinity,
								repeatDelay: motionDuration(REPEAT_DELAY),
								delay: seq * motionDuration(STAGGER_INTERVAL),
								ease: [0.16, 1, 0.3, 1],
							}}
						>
							<g transform={`rotate(${angle})`}>
								{/* Sleek 2-dot trailing echo */}
								<circle cx={-12} cy={0} r={1.1} fill="#111" opacity={0.18} />
								<circle cx={-7} cy={0} r={1.8} fill="#111" opacity={0.35} />
								{/* Lead signal dot */}
								<circle cx={0} cy={0} r={2.8} fill="#111" />
							</g>
						</motion.g>
					))}

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
				{LEAF_NODES.map((n) => (
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

						{/* File name label */}
						<text
							x={n.x}
							y={n.y + n.labelY}
							textAnchor="middle"
							className="cochange-node-label"
						>
							{n.label}
						</text>

						{/* Co-change score */}
						<text x={n.x} y={n.y + n.scoreY} textAnchor="middle" className="cochange-score">
							{n.score}
						</text>
					</g>
				))}
			</svg>
		</motion.div>
	);
}
