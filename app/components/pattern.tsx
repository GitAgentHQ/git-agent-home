import type { CSSProperties, ReactNode } from "react";

/** Logical coordinate space for the reusable command-card dot fields. */
const DOT_FIELD_SIZE = 220;
const DOT_STEP = 16;
const DOT_R_MAX = 3;
const DOT_R_MIN = 1.12;
const DOT_SOLID_CORE_FRACTION = 0.66;
const D_MAX_CIRCLE = DOT_FIELD_SIZE / 2;
const D_MAX_SQUARE = (DOT_FIELD_SIZE / 2) * Math.SQRT2;

export type EntryPatternMotion =
	| "init"
	| "commit"
	| "related"
	| "status"
	| "skills"
	| "config";

export type EntryPatternShape =
	| "seed"
	| "ledger"
	| "diamond"
	| "capsule"
	| "hexagon"
	| "chamfer";

interface Dot {
	key: string;
	x: number;
	y: number;
	radius: number;
	row: number;
	column: number;
	distance: number;
}

interface DotGroup {
	key: number;
	dots: Dot[];
}

interface AnimatedDotGroup extends DotGroup {
	style: DotGroupStyle;
}

interface DotGroupStyle extends CSSProperties {
	"--pattern-delay": string;
	"--pattern-shift-x"?: string;
	"--pattern-shift-y"?: string;
}

function buildRadialDots(dMax: number): Dot[] {
	const center = DOT_FIELD_SIZE / 2;
	const coreEnd = dMax * DOT_SOLID_CORE_FRACTION;
	const fadeSpan = Math.max(dMax - coreEnd, 1e-6);
	const dots: Dot[] = [];

	for (let y = DOT_STEP / 2, row = 0; y < DOT_FIELD_SIZE; y += DOT_STEP, row += 1) {
		for (let x = DOT_STEP / 2, column = 0; x < DOT_FIELD_SIZE; x += DOT_STEP, column += 1) {
			const distance = Math.hypot(x - center, y - center);
			const taper = Math.min(1, Math.max(0, (distance - coreEnd) / fadeSpan));
			const radius =
				distance <= coreEnd
					? DOT_R_MAX
					: DOT_R_MIN + (DOT_R_MAX - DOT_R_MIN) * (1 - taper) * (1 - taper);

			dots.push({
				key: `${x}-${y}`,
				x,
				y,
				radius,
				row,
				column,
				distance,
			});
		}
	}

	return dots;
}

function groupDots(dots: Dot[], getKey: (dot: Dot) => number): DotGroup[] {
	const groups = new Map<number, Dot[]>();

	for (const dot of dots) {
		const key = getKey(dot);
		const group = groups.get(key);

		if (group) {
			group.push(dot);
		} else {
			groups.set(key, [dot]);
		}
	}

	return [...groups.entries()]
		.sort(([left], [right]) => left - right)
		.map(([key, groupedDots]) => ({ key, dots: groupedDots }));
}

function withTiming(
	groups: DotGroup[],
	getStyle: (group: DotGroup) => DotGroupStyle,
): AnimatedDotGroup[] {
	return groups.map((group) => ({ ...group, style: getStyle(group) }));
}

function getMotionGroups(dots: Dot[], motion: EntryPatternMotion): AnimatedDotGroup[] {
	switch (motion) {
		case "init":
			return withTiming(
				groupDots(dots, (dot) => Math.min(5, Math.floor(dot.distance / 20))),
				(group) => ({ "--pattern-delay": `${group.key * 46}ms` }),
			);
		case "commit":
			return withTiming(
				groupDots(dots, (dot) => dot.row),
				(group) => ({ "--pattern-delay": `${group.key * 24}ms` }),
			);
		case "related":
			return withTiming(
				groupDots(dots, (dot) => Math.floor((dot.row + dot.column) / 2)),
				(group) => ({ "--pattern-delay": `${group.key * 32}ms` }),
			);
		case "status":
			return withTiming(
				groupDots(dots, (dot) => Math.min(3, Math.floor(dot.distance / 34))),
				(group) => ({ "--pattern-delay": `${group.key * 48}ms` }),
			);
		case "skills":
			return withTiming(
				groupDots(dots, (dot) => dot.column),
				(group) => ({ "--pattern-delay": `${group.key * 24}ms` }),
			);
		case "config":
			return withTiming(
				groupDots(dots, (dot) => (dot.row % 2) * 2 + (dot.column % 2)),
				(group) => ({
					"--pattern-delay": `${group.key * 54}ms`,
					"--pattern-shift-x": `${group.key % 2 === 0 ? -8 : 8}px`,
					"--pattern-shift-y": `${group.key < 2 ? -6 : 6}px`,
				}),
			);
	}
}

const RADIAL_DOTS_CIRCLE = buildRadialDots(D_MAX_CIRCLE);
const RADIAL_DOTS_SQUARE = buildRadialDots(D_MAX_SQUARE);

function getDotsForShape(shape: EntryPatternShape): Dot[] {
	return shape === "seed" || shape === "capsule" ? RADIAL_DOTS_CIRCLE : RADIAL_DOTS_SQUARE;
}

function DotFieldSvg({ children }: { children: ReactNode }) {
	return (
		<svg
			className="pattern-dots-svg"
			viewBox={`0 0 ${DOT_FIELD_SIZE} ${DOT_FIELD_SIZE}`}
			width="100%"
			height="100%"
			preserveAspectRatio="xMidYMid meet"
			style={{ color: "var(--dot)" }}
		>
			{children}
		</svg>
	);
}

interface DotFieldProps {
	shape: EntryPatternShape;
	dots: Dot[];
	motion: EntryPatternMotion;
}

function DotField({ shape, dots, motion }: DotFieldProps) {
	const groups = getMotionGroups(dots, motion);

	return (
		<div className={`pattern-dots pattern-dots--${shape}`} data-pattern-motion={motion} aria-hidden="true">
			<DotFieldSvg>
				{groups.map((group) => (
					<g className="pattern-dot-group" key={group.key} style={group.style}>
						{group.dots.map((dot) => (
							<circle key={dot.key} cx={dot.x} cy={dot.y} r={dot.radius} fill="currentColor" />
						))}
					</g>
				))}
			</DotFieldSvg>
		</div>
	);
}

interface DotsPatternProps {
	motion: EntryPatternMotion;
	shape: EntryPatternShape;
}

export function DotsPattern({ motion, shape }: DotsPatternProps) {
	return <DotField shape={shape} dots={getDotsForShape(shape)} motion={motion} />;
}
