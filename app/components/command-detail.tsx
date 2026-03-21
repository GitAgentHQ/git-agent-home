import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";

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

	return (
		<motion.div
			className="command-view"
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
			exit={{ opacity: 0, y: 16, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
		>
			<nav className="command-nav">
				<motion.button
					className="command-back"
					onClick={onBack}
					whileHover={{ borderColor: "rgba(255,255,255,0.55)", color: "#fff" }}
					transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
				>
					{t.back}
				</motion.button>
				<code className="command-breadcrumb">{cmd}</code>
			</nav>

			<div className="command-content">
				<motion.header
					className="command-hero"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
				>
					<code className="command-label">{cmd}</code>
					<h1 className="command-heading">{description}</h1>
					<div className="command-usage">
						<code>{usage}</code>
					</div>
				</motion.header>

				<motion.section
					className="command-section"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
				>
					<h2 className="section-label">{t.overview}</h2>
					<p className="section-body">{overview}</p>
				</motion.section>

				<motion.section
					className="command-section"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
				>
					<h2 className="section-label">{t.flags}</h2>
					<div className="flag-list">
						{flags.map((flag, i) => (
							<motion.div
								key={i}
								className="flag-row"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.38 + i * 0.06 }}
							>
								<code className="flag-name">{flag.name}</code>
								<div className="flag-info">
									<span className="flag-desc">{flag.description}</span>
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
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
				>
					<h2 className="section-label">{t.workflow}</h2>
					<div className="step-list">
						{steps.map((step, i) => (
							<motion.div
								key={i}
								className="step"
								initial={{ opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.09 }}
							>
								<span className="step-num">{String(i + 1).padStart(2, "0")}</span>
								<div className="step-content">
									<strong className="step-title">{step.title}</strong>
									<p className="step-desc">{step.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.section>
			</div>
		</motion.div>
	);
}
