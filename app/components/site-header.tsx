import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { LangSwitch } from "./lang-switch";
import { useLanguage } from "../contexts/language-context";
import { motionDuration, motionEase, useAccessibleMotion } from "../utils/motion-prefs";

const MotionBackLink = motion.create(Link);

const COLOR_WHITE_55 = "rgba(255, 255, 255, 0.55)";
const COLOR_WHITE = "#fff";

type SiteHeaderProps = (
	| { to: string; onBack?: never }
	| { to?: never; onBack: () => void }
) & {
	/** Optional breadcrumb / command label shown next to the leading element. */
	breadcrumb?: string;
	/** Optional right-side actions rendered before the language switch. */
	actions?: ReactNode;
};

/**
 * Sticky site header shared by detail views and programmatic SEO pages.
 * Leading element on the left, language switch pinned to the right.
 */
export function SiteHeader({ to, onBack, breadcrumb, actions }: SiteHeaderProps) {
	const { t } = useLanguage();
	const reduced = useAccessibleMotion();

	const backClass = "command-back";
	const hover = reduced
		? undefined
		: { borderColor: COLOR_WHITE_55, color: COLOR_WHITE };
	const transition = { duration: reduced ? 0 : motionDuration(0.28), ease: motionEase };
	const backLabel = t.back;

	return (
		<nav className="command-nav">
			{to ? (
				<MotionBackLink to={to} className={backClass} whileHover={hover} transition={transition}>
					{backLabel}
				</MotionBackLink>
			) : (
				<motion.button
					type="button"
					className={backClass}
					onClick={onBack}
					whileHover={hover}
					transition={transition}
				>
					{backLabel}
				</motion.button>
			)}
			{breadcrumb && <code className="command-breadcrumb">{breadcrumb}</code>}
			{actions}
			<LangSwitch />
		</nav>
	);
}
