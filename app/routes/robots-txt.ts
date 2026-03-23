import { BASE_URL } from "../lib/constants";

export function loader() {
	const body = [
		"User-agent: *",
		"Allow: /",
		"",
		`Sitemap: ${BASE_URL}/sitemap.xml`,
	].join("\n");

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
