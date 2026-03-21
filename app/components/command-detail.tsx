import { motion } from "motion/react";

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
	return (
		<motion.div
			className="command-view"
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 16 }}
			transition={{ type: "spring", damping: 32, stiffness: 50, duration: 1 }}
		>
			<nav className="command-nav">
				<button className="command-back" onClick={onBack}>
					← back
				</button>
				<code className="command-breadcrumb">{cmd}</code>
			</nav>

			<div className="command-content">
				<header className="command-hero">
					<code className="command-label">{cmd}</code>
					<h1 className="command-heading">{description}</h1>
					<div className="command-usage">
						<code>{usage}</code>
					</div>
				</header>

				<section className="command-section">
					<h2 className="section-label">Overview</h2>
					<p className="section-body">{overview}</p>
				</section>

				<section className="command-section">
					<h2 className="section-label">Flags</h2>
					<div className="flag-list">
						{flags.map((flag, i) => (
							<div key={i} className="flag-row">
								<code className="flag-name">{flag.name}</code>
								<div className="flag-info">
									<span className="flag-desc">{flag.description}</span>
									{flag.default && (
										<span className="flag-default">default: {flag.default}</span>
									)}
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="command-section">
					<h2 className="section-label">Workflow</h2>
					<div className="step-list">
						{steps.map((step, i) => (
							<div key={i} className="step">
								<span className="step-num">{String(i + 1).padStart(2, "0")}</span>
								<div className="step-content">
									<strong className="step-title">{step.title}</strong>
									<p className="step-desc">{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</motion.div>
	);
}
