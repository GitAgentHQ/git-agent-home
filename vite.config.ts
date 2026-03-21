import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { createLogger, defineConfig } from "vite";

const logger = createLogger();
const originalWarn = logger.warn.bind(logger);
logger.warn = (msg, options) => {
	if (msg.includes("`esbuild` option was specified by")) return;
	originalWarn(msg, options);
};

export default defineConfig({
	customLogger: logger,
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		reactRouter(),
	],
	resolve: {
		tsconfigPaths: true,
	},
});
