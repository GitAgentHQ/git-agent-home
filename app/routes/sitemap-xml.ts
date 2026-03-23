import { personaEntries } from "../data/personas";
import { comparisonEntries } from "../data/comparisons";
import { glossaryEntries } from "../data/glossary";
import { templateEntries } from "../data/templates";
import { BASE_URL } from "../lib/constants";
const TODAY = new Date().toISOString().split("T")[0];

function urlEntry(loc: string, changefreq: string, priority: string) {
	return [
		"  <url>",
		`    <loc>${BASE_URL}${loc}</loc>`,
		`    <lastmod>${TODAY}</lastmod>`,
		`    <changefreq>${changefreq}</changefreq>`,
		`    <priority>${priority}</priority>`,
		"  </url>",
	].join("\n");
}

export function loader() {
	const staticPages = [
		urlEntry("/", "weekly", "1.0"),
		urlEntry("/for", "weekly", "0.8"),
		urlEntry("/vs", "weekly", "0.8"),
		urlEntry("/glossary", "weekly", "0.8"),
		urlEntry("/templates", "weekly", "0.8"),
	];

	const dynamicPages = [
		...personaEntries.map((e) => urlEntry(`/for/${e.slug}`, "monthly", "0.7")),
		...comparisonEntries.map((e) => urlEntry(`/vs/${e.slug}`, "monthly", "0.7")),
		...glossaryEntries.map((e) => urlEntry(`/glossary/${e.slug}`, "monthly", "0.7")),
		...templateEntries.map((e) => urlEntry(`/templates/${e.slug}`, "monthly", "0.7")),
	];

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...staticPages,
		...dynamicPages,
		"</urlset>",
	].join("\n");

	return new Response(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
}
