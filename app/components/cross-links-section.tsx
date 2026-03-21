import { Link } from "react-router";
import type { CrossLink } from "../data/types";
import type { Language } from "../i18n/translations";
import { useLanguage } from "../contexts/language-context";

function isExternalHref(href: string) {
	return /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");
}

function CrossLinkRow({ link, language }: { link: CrossLink; language: Language }) {
	const text = link.label[language];
	if (isExternalHref(link.href)) {
		return (
			<a
				href={link.href}
				className="cross-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				{text}
			</a>
		);
	}
	return (
		<Link to={link.href} className="cross-link">
			{text}
		</Link>
	);
}

export function CrossLinksSection({ links }: { links: CrossLink[] }) {
	const { language, t } = useLanguage();
	if (links.length === 0) return null;

	return (
		<section className="command-section cross-links">
			<span className="cross-links-label">{t.pseoRelated}</span>
			<div className="cross-links-list">
				{links.map((link) => (
					<CrossLinkRow key={link.href} link={link} language={language} />
				))}
			</div>
		</section>
	);
}
