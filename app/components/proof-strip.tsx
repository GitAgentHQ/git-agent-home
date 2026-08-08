import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";
import { GITHUB_URL } from "../lib/constants";
import { motionDuration, motionEase, useAccessibleMotion, useTimedReveal } from "../utils/motion-prefs";

const items = [
	{ key: "proofOpenSource" as const, href: GITHUB_URL },
	{ key: "proofFreeGateway" as const, href: null },
	{ key: "proofOffline" as const, href: null },
	{ key: "proofMeasured" as const, href: null },
];

export function ProofStrip() {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();
	const { shown } = useTimedReveal({ delay: 0.9 });

	return (
		<motion.div
			className="proof-strip"
			role="group"
			aria-label={t.proofStripLabel}
			initial={reduced ? false : { opacity: 0, y: 8 }}
			animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
			transition={{
				duration: reduced ? 0 : motionDuration(0.5),
				ease: motionEase,
			}}
		>
			{items.map(({ key, href }, i) => {
				const content = (
					<>
						<span className="proof-dot" aria-hidden="true" />
						<span className="proof-text">{t[key]}</span>
					</>
				);
				return (
					<span className="proof-item" key={key}>
						{href ? (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="proof-link"
							>
								{content}
							</a>
						) : (
							content
						)}
						{i < items.length - 1 && (
							<span className="proof-sep" aria-hidden="true" />
						)}
					</span>
				);
			})}
		</motion.div>
	);
}
