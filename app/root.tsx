import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { LanguageProvider, useLanguage } from "./contexts/language-context";
import "./app.css";

export const links: Route.LinksFunction = () => [
	{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href:
			"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
	},
];

function HtmlLang({ children }: { children: React.ReactNode }) {
	const { language } = useLanguage();
	return (
		<html
			lang={language === "zh" ? "zh-Hans" : "en"}
			// Inline on <html> so the dark background paints on the very first
			// parse — before any stylesheet (JS-injected or critical) arrives.
			style={{ background: "#050505", colorScheme: "dark" }}
		>
			{children}
		</html>
	);
}

function SkipLink() {
	const { t } = useLanguage();
	return (
		<a href="#main-content" className="skip-link">
			{t.skipToContent}
		</a>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<LanguageProvider>
			<HtmlLang>
				<head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, viewport-fit=cover"
					/>
					<meta name="color-scheme" content="dark" />
					<meta name="theme-color" content="#050505" />
					{/* Keep the document canvas dark before the stylesheet is parsed. */}
					<style
						dangerouslySetInnerHTML={{
							__html: ":root,html,body{color-scheme:dark;background:#050505;}",
						}}
					/>
					<Meta />
					<Links />
				</head>
				<body>
					<SkipLink />
					{children}
					<ScrollRestoration />
					<Scripts />
				</body>
			</HtmlLang>
		</LanguageProvider>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const { t } = useLanguage();
	let message = t.errorFallbackTitle;
	let details = t.errorFallbackBody;
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404 ? t.notFoundBody : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="page" id="main-content">
			<div role="alert">
				<div className="command-content" style={{ paddingTop: "80px" }}>
					<div className="command-section">
						<h1>{message}</h1>
						<p className="section-body">{details}</p>
						{stack && (
							<pre className="code-block">
								<code className="code-block-code">{stack}</code>
							</pre>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
