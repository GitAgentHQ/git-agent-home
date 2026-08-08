import { Link } from "react-router";
import { motion } from "motion/react";
import type { I18nText } from "../data/types";
import { motionEase, useAccessibleMotion } from "../utils/motion-prefs";

const MotionLink = motion.create(Link);

interface HubEntry {
	slug: string;
	language?: I18nText;
	term?: I18nText;
	type?: I18nText;
	title?: I18nText;
	tool?: I18nText;
	name?: string;
	tagline?: I18nText;
	description?: I18nText;
	definition?: I18nText;
}

interface HubGridProps {
	entries: HubEntry[];
	basePath: string;
	labelKey?: "language" | "term" | "type" | "name" | "title" | "tool";
	descKey?: "tagline" | "description" | "definition";
	currentLang: "en" | "zh";
}

export function HubGrid({
	entries,
	basePath,
	labelKey = "language",
	descKey = "tagline",
	currentLang,
}: HubGridProps) {
	const reduced = useAccessibleMotion();

	return (
		<ul className="hub-grid">
			{entries.map((entry) => {
				const label =
					labelKey === "name"
						? entry.name
						: entry[labelKey]?.[currentLang];
				const desc = entry[descKey]?.[currentLang];

				return (
					<li key={entry.slug} className="hub-grid-item">
						<MotionLink
							to={`${basePath}/${entry.slug}`}
							className="hub-card"
							whileHover={
								reduced
									? undefined
									: {
											y: -4,
											transition: { duration: 0.28, ease: motionEase },
										}
							}
						>
							{label && <span className="hub-card-name">{label}</span>}
							{desc && <span className="hub-card-desc">{desc}</span>}
						</MotionLink>
					</li>
				);
			})}
		</ul>
	);
}
