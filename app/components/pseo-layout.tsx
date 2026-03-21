import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PseoFooter } from "./pseo-footer";
import { useLanguage } from "../contexts/language-context";
import { motionDuration, motionEase, useAccessibleMotion } from "../utils/motion-prefs";

const MotionBackLink = motion(Link);

interface PseoLayoutProps {
	breadcrumb: string;
	backHref: string;
	children: ReactNode;
}

export function PseoLayout({ breadcrumb, backHref, children }: PseoLayoutProps) {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();

	return (
		<motion.div
			className="command-view"
			initial={reduced ? false : { opacity: 0, y: 24 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { duration: reduced ? 0 : motionDuration(0.45), ease: motionEase },
			}}
		>
			<nav className="command-nav">
				<MotionBackLink
					to={backHref}
					className="command-back"
					whileHover={
						reduced
							? undefined
							: { borderColor: "rgba(255, 255, 255, 0.55)", color: "#fff" }
					}
					transition={{ duration: reduced ? 0 : motionDuration(0.28), ease: motionEase }}
				>
					{t.back}
				</MotionBackLink>
				<code className="command-breadcrumb">{breadcrumb}</code>
			</nav>
			<div className="command-content">
				{children}
				<PseoFooter />
			</div>
		</motion.div>
	);
}
