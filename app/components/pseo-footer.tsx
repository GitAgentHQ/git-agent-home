import { Link } from "react-router";
import { CodeBlock } from "./code-block";
import { useLanguage } from "../contexts/language-context";
import { INSTALL_COMMAND, GITHUB_URL } from "../lib/constants";

export function PseoFooter() {
	const { t } = useLanguage();

	return (
		<div className="pseo-footer">
			<div className="pseo-footer-cta">
				<p className="pseo-footer-cta-heading">{t.pseoFooterCtaHeading}</p>
				<CodeBlock code={INSTALL_COMMAND} />
				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="pseo-footer-cta-link"
				>
					github.com/GitAgentHQ/git-agent-cli
				</a>
			</div>
			<nav className="pseo-footer-nav">
				<Link to="/for" className="pseo-footer-nav-link">
					{t.pseoFooterNavLanguages}
				</Link>
				<Link to="/vs" className="pseo-footer-nav-link">
					{t.pseoFooterNavComparisons}
				</Link>
				<Link to="/glossary" className="pseo-footer-nav-link">
					{t.pseoFooterNavGlossary}
				</Link>
				<Link to="/templates" className="pseo-footer-nav-link">
					{t.pseoFooterNavTemplates}
				</Link>
			</nav>
		</div>
	);
}
