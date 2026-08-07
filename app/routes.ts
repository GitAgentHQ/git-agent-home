import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),

	// SEO infrastructure
	route("robots.txt", "routes/robots-txt.ts"),
	route("sitemap.xml", "routes/sitemap-xml.ts"),

	// Playbook 1: Personas — /for/[language]
	route("for", "routes/for._index.tsx"),
	route("for/:language", "routes/for.$language.tsx"),

	// Playbook 2: Comparisons — /vs/[competitor]
	route("vs", "routes/vs._index.tsx"),
	route("vs/:competitor", "routes/vs.$competitor.tsx"),

	// Playbook 3: Glossary — /glossary/[term]
	route("glossary", "routes/glossary._index.tsx"),
	route("glossary/:term", "routes/glossary.$term.tsx"),

	// Playbook 4: Templates — /templates/[type]
	route("templates", "routes/templates._index.tsx"),
	route("templates/:type", "routes/templates.$type.tsx"),

	// Playbook 5: Integrations — /integrations/[slug]
	route("integrations", "routes/integrations._index.tsx"),
	route("integrations/:slug", "routes/integrations.$slug.tsx"),

	// Playbook 6: Use Cases — /use-cases/[slug]
	route("use-cases", "routes/use-cases._index.tsx"),
	route("use-cases/:slug", "routes/use-cases.$slug.tsx"),
] satisfies RouteConfig;