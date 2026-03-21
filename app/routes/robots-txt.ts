export function loader() {
	const body = [
		"User-agent: *",
		"Allow: /",
		"",
		"Sitemap: https://gitagent.dev/sitemap.xml",
	].join("\n");

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
