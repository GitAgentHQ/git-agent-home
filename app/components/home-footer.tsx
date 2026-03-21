import { useLanguage } from "../contexts/language-context";

const GITHUB_FRAD = "https://github.com/fradser/";
const CONTACT_EMAIL = "frad@git-agent.dev";

export function HomeFooter() {
	const { t } = useLanguage();

	return (
		<footer className="home-footer">
			<div className="home-footer-inner">
				<p className="home-footer-credit">
					{t.homeFooterMadeByPrefix}
					<a
						href={GITHUB_FRAD}
						target="_blank"
						rel="noopener noreferrer"
						className="home-footer-link"
					>
						Frad
					</a>
					{t.homeFooterMadeBySuffix}
				</p>
				<a href={`mailto:${CONTACT_EMAIL}`} className="home-footer-email">
					{CONTACT_EMAIL}
				</a>
			</div>
		</footer>
	);
}
