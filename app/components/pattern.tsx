import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";


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
	return <div className="pattern-dots-circle" aria-hidden="true" />;
}

export function DotsSquare({ rounded, circle }: DotsSquareProps) {
	let className = "pattern-dots-square";
	if (circle) className = "pattern-dots-square-circle";
	else if (rounded) className = "pattern-dots-square-rounded";
	return <div className={className} aria-hidden="true" />;
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
