import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PseoFooter } from "./pseo-footer";
import { SiteHeader } from "./site-header";
import { useLanguage } from "../contexts/language-context";
import { motionDuration, motionEase, useAccessibleMotion } from "../utils/motion-prefs";

interface PseoLayoutProps {
	breadcrumb: string;
	backHref: string;
	children: ReactNode;
}

export function PseoLayout({ breadcrumb, backHref, children }: PseoLayoutProps) {
	const reduced = useAccessibleMotion();

	return (
		<motion.main
			className="command-view"
			id="main-content"
			initial={reduced ? false : { opacity: 0, y: 24 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { duration: reduced ? 0 : motionDuration(0.45), ease: motionEase },
			}}
		>
			<SiteHeader to={backHref} breadcrumb={breadcrumb} />
			<div className="command-content">
				{children}
				<PseoFooter />
			</div>
		</motion.main>
	);
}
