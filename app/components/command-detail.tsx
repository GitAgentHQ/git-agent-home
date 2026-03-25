import { motion } from "motion/react";
import { CodeBlock } from "./code-block";
import { useLanguage } from "../contexts/language-context";
import { renderInlineDocText } from "../utils/inline-doc-text";
import { motionDuration, motionEase, useAccessibleMotion } from "../utils/motion-prefs";

interface Flag {
	name: string;
	description: string;
	default?: string;
}

interface Step {
	title: string;
	description: string;
}

interface CommandDetailProps {
	cmd: string;
	description: string;
	usage: string;
	overview: string;
	flags: Flag[];
	steps: Step[];
	onBack: () => void;
}

export function CommandDetail({
	cmd,
	description,
	usage,
	overview,
	flags,
	steps,
	onBack,
}: CommandDetailProps) {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();
	const tr = (duration: number, delay = 0) => ({
		duration: reduced ? 0 : duration,
		ease: motionEase,
		delay: reduced ? 0 : delay,
	});

	return (
		<motion.div
			className="command-view"
			initial={reduced ? false : { opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0, transition: tr(motionDuration(0.45)) }}
			exit={{ opacity: 0, y: 16, transition: tr(motionDuration(0.28)) }}
		>
			<nav className="command-nav">
				<motion.button
					className="command-back"
					onClick={onBack}
					whileHover={
						reduced
							? undefined
							: { borderColor: "rgba(255,255,255,0.55)", color: "#fff" }
					}
					transition={tr(motionDuration(0.28))}
				>
					{t.back}
				</motion.button>
				<code className="command-breadcrumb">{cmd}</code>
			</nav>

			<div className="command-content">
				<motion.header
					className="command-hero"
					initial={reduced ? false : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={tr(motionDuration(0.5), motionDuration(0.12))}
				>
					<code className="command-label">{cmd}</code>
					<h1 className="command-heading">{description}</h1>
					<CodeBlock code={usage} />
				</motion.header>

				<motion.section
					className="command-section"
					initial={reduced ? false : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={tr(motionDuration(0.5), motionDuration(0.25))}
				>
					<h2 className="section-label">{t.overview}</h2>
					<p className="section-body">{renderInlineDocText(overview)}</p>
				</motion.section>

				<motion.section
					className="command-section"
					initial={reduced ? false : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={tr(motionDuration(0.5), motionDuration(0.35))}
				>
					<h2 className="section-label">{t.flags}</h2>
					<div className="flag-list">
						{flags.map((flag, i) => (
							<motion.div
								key={i}
								className="flag-row"
								initial={reduced ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={tr(
									motionDuration(0.38),
									motionDuration(0.38) + i * motionDuration(0.06),
								)}
							>
								<code className="flag-name">{flag.name}</code>
								<div className="flag-info">
									<span className="flag-desc">{renderInlineDocText(flag.description)}</span>
									{flag.default && (
										<span className="flag-default">{t.default}: {flag.default}</span>
									)}
								</div>
							</motion.div>
						))}
					</div>
				</motion.section>

				<motion.section
					className="command-section"
					initial={reduced ? false : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={tr(motionDuration(0.5), motionDuration(0.45))}
				>
					<h2 className="section-label">{t.workflow}</h2>
					<div className="step-list">
						{steps.map((step, i) => (
							<motion.div
								key={i}
								className="step"
								initial={reduced ? false : { opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={tr(
									motionDuration(0.45),
									motionDuration(0.5) + i * motionDuration(0.09),
								)}
							>
								<span className="step-num">{String(i + 1).padStart(2, "0")}</span>
								<div className="step-content">
									<strong className="step-title">{step.title}</strong>
									<p className="step-desc">{renderInlineDocText(step.description)}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.section>
			</div>
		</motion.div>
	);
}
