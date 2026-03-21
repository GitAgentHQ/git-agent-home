import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PseoFooter } from "./pseo-footer";
import { useLanguage } from "../contexts/language-context";

const MotionBackLink = motion(Link);

interface PseoLayoutProps {
	breadcrumb: string;
	backHref: string;
	children: ReactNode;
}

export function PseoLayout({ breadcrumb, backHref, children }: PseoLayoutProps) {
	const { t } = useLanguage();

	return (
		<motion.div
			className="command-view"
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
		>
			<nav className="command-nav">
				<MotionBackLink
					to={backHref}
					className="command-back"
					whileHover={{ borderColor: "rgba(255, 255, 255, 0.55)", color: "#fff" }}
					transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
