import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import type { ReactElement } from "react";

/** Logical coordinate space for dot fields (matches prior CSS box size). */
const DOT_FIELD_SIZE = 220;
const DOT_STEP = 16;
const DOT_R_MAX = 3;
const DOT_R_MIN = 1.12;
/**
 * Inner share of the radius (0→dMax): dots stay at full size for a solid-looking core;
 * only the outer ring tapers toward DOT_R_MIN.
 */
const DOT_SOLID_CORE_FRACTION = 0.66;
/** Normalized distance to circular edge from center (half of field). */
const D_MAX_CIRCLE = DOT_FIELD_SIZE / 2;
/** Normalized distance to square corner from center. */
const D_MAX_SQUARE = (DOT_FIELD_SIZE / 2) * Math.SQRT2;

function buildRadialDotElements(dMax: number): ReactElement[] {
	const cx = DOT_FIELD_SIZE / 2;
	const cy = DOT_FIELD_SIZE / 2;
	const coreEnd = dMax * DOT_SOLID_CORE_FRACTION;
	const fadeSpan = Math.max(dMax - coreEnd, 1e-6);
	const out: ReactElement[] = [];
	for (let y = DOT_STEP / 2; y < DOT_FIELD_SIZE; y += DOT_STEP) {
		for (let x = DOT_STEP / 2; x < DOT_FIELD_SIZE; x += DOT_STEP) {
			const d = Math.hypot(x - cx, y - cy);
			let r: number;
			if (d <= coreEnd) {
				r = DOT_R_MAX;
			} else {
				const t = Math.min(1, (d - coreEnd) / fadeSpan);
				/* Ease-out in the outer band only */
				r = DOT_R_MIN + (DOT_R_MAX - DOT_R_MIN) * (1 - t) * (1 - t);
			}
			out.push(
				<circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="currentColor" />,
			);
		}
	}
	return out;
}

/** Dots shrink toward circular boundary (init card, circle-masked square variant). */
const RADIAL_DOTS_CIRCLE = buildRadialDotElements(D_MAX_CIRCLE);
/** Dots shrink toward square corners (commit card, rounded square). */
const RADIAL_DOTS_SQUARE = buildRadialDotElements(D_MAX_SQUARE);

function DotFieldSvg({ children }: { children: React.ReactNode }) {
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

interface DotsSquareProps {
	rounded?: boolean;
	circle?: boolean;
}

const easeOrb = [0.22, 1, 0.36, 1] as const;

function useFilterDomId(prefix: string) {
	const raw = useId().replace(/:/g, "");
	return `${prefix}-${raw}`;
}


function LinesDisplaceFilter({ id }: { id: string }) {
	return (
		<svg
			className="pattern-filter-svg"
			width="0"
			height="0"
			aria-hidden="true"
			focusable="false"
		>
			<defs>
				<filter
					id={id}
					x="-35%"
					y="-35%"
					width="170%"
					height="170%"
					colorInterpolationFilters="sRGB"
				>
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.025 0.11"
						numOctaves="2"
						seed="7"
						result="noise"
					>
						<animate
							attributeName="baseFrequency"
							dur="12s"
							values="0.02 0.09;0.03 0.16;0.02 0.09"
							repeatCount="indefinite"
						/>
					</feTurbulence>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="1.9"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</defs>
		</svg>
	);
}

export function DotsNoiseFilter() {
	return (
		<svg
			className="pattern-filter-svg"
			width="0"
			height="0"
			aria-hidden="true"
			focusable="false"
		>
			<defs>
				{/* Circle: slow large-scale warp — amplifies the outward dissolve */}
				<filter
					id="dots-displace-circle"
					x="-12%"
					y="-12%"
					width="124%"
					height="124%"
					colorInterpolationFilters="sRGB"
				>
					<feTurbulence
						type="turbulence"
						baseFrequency="0.025"
						numOctaves="2"
						seed="11"
						result="noise"
					>
						<animate
							attributeName="baseFrequency"
							dur="9s"
							values="0.018;0.042;0.018"
							repeatCount="indefinite"
						/>
					</feTurbulence>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="10"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
				{/* Square: faster fine-grain turbulence — gives the pulse a shimmering texture */}
				<filter
					id="dots-displace-square"
					x="-8%"
					y="-8%"
					width="116%"
					height="116%"
					colorInterpolationFilters="sRGB"
				>
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.065"
						numOctaves="3"
						seed="4"
						result="noise"
					>
						<animate
							attributeName="baseFrequency"
							dur="5s"
							values="0.05;0.09;0.05"
							repeatCount="indefinite"
						/>
					</feTurbulence>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="5"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</defs>
		</svg>
	);
}

export function DotsCircle() {
	const reduced = useReducedMotion();
	if (reduced) {
		return (
			<div className="pattern-dots-circle" aria-hidden="true">
				<DotFieldSvg>{RADIAL_DOTS_CIRCLE}</DotFieldSvg>
			</div>
		);
	}

	return (
		<motion.div
			className="pattern-dots-circle"
			aria-hidden="true"
			transition={{
				filter: { duration: 0 },
				opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
			}}
			variants={{
				hover: {
					filter: "url(#dots-displace-circle)",
					opacity: [1, 0.28, 1],
					transition: {
						filter: { duration: 0 },
						opacity: { duration: 8, ease: [0.4, 0, 0.6, 1], repeat: Infinity, times: [0, 0.55, 1] },
					},
				},
			}}
		>
			<DotFieldSvg>
				<motion.g
					style={{ transformOrigin: "110px 110px" }}
					variants={{
						hover: {
							scale: [1, 1.12, 1],
							transition: {
								duration: 8,
								ease: [0.4, 0, 0.6, 1],
								repeat: Infinity,
								times: [0, 0.55, 1],
							},
						},
					}}
				>
					{RADIAL_DOTS_CIRCLE}
				</motion.g>
			</DotFieldSvg>
		</motion.div>
	);
}

export function DotsSquare({ rounded, circle }: DotsSquareProps) {
	const reduced = useReducedMotion();
	let className = "pattern-dots-square";
	if (circle) className = "pattern-dots-square-circle";
	else if (rounded) className = "pattern-dots-square-rounded";

	const dots = circle ? RADIAL_DOTS_CIRCLE : RADIAL_DOTS_SQUARE;

	if (reduced) {
		return (
			<div className={className} aria-hidden="true">
				<DotFieldSvg>{dots}</DotFieldSvg>
			</div>
		);
	}

	return (
		<motion.div
			className={className}
			aria-hidden="true"
			transition={{
				filter: { duration: 0 },
				scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
				opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
			}}
			variants={{
				hover: {
					filter: "url(#dots-displace-square)",
					scale: [1, 1.08, 1],
					opacity: [1, 0.75, 1],
					transition: {
						filter: { duration: 0 },
						scale: { duration: 7.6, ease: [0.22, 1, 0.36, 1], repeat: Infinity, times: [0, 0.3, 1] },
						opacity: { duration: 7.6, ease: [0.22, 1, 0.36, 1], repeat: Infinity, times: [0, 0.3, 1] },
					},
				},
			}}
		>
			<DotFieldSvg>{dots}</DotFieldSvg>
		</motion.div>
	);
}

export function LinesCircle() {
	const reduced = useReducedMotion();
	const filterId = useFilterDomId("lines-displace");

	return (
		<motion.div
			className="pattern-lines-circle"
			aria-hidden="true"
			initial={false}
			animate={reduced ? {} : { rotate: -360 }}
			transition={
				reduced
					? {}
					: {
							rotate: {
								duration: 21,
								repeat: Infinity,
								ease: "linear",
							},
						}
			}
		>
			{!reduced && <LinesDisplaceFilter id={filterId} />}
			<div className="pattern-lines-circle__stack">
				{!reduced && (
					<>
						<motion.span
							className="pattern-lines-circle__glow pattern-lines-circle__glow--a"
							animate={{
								x: [0, 8, -4, 0],
								y: [0, -9, 10, 0],
								opacity: [0.22, 0.38, 0.24, 0.22],
							}}
							transition={{
								duration: 13,
								repeat: Infinity,
								ease: easeOrb,
							}}
							initial={false}
							aria-hidden="true"
						/>
						<motion.span
							className="pattern-lines-circle__glow pattern-lines-circle__glow--b"
							animate={{
								x: [0, -11, 10, 0],
								y: [0, 7, -6, 0],
								opacity: [0.18, 0.32, 0.2, 0.18],
							}}
							transition={{
								duration: 16,
								repeat: Infinity,
								ease: easeOrb,
								delay: 0.6,
							}}
							initial={false}
							aria-hidden="true"
						/>
					</>
				)}
				<motion.span
					className="pattern-lines-circle__surface"
					aria-hidden="true"
					style={
						reduced
							? undefined
							: { filter: `url(#${filterId})` }
					}
					animate={reduced ? {} : { scale: [1, 1.04, 1] }}
					transition={
						reduced
							? {}
							: {
									duration: 5.75,
									repeat: Infinity,
									ease: [0.4, 0, 0.2, 1],
								}
					}
				/>
			</div>
		</motion.div>
	);
}
