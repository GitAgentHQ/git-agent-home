import { RouterContextProvider, createRequestHandler } from "react-router";
import { cloudflareContext } from "../app/lib/context";
import { handleWebhookAPI } from "./webhook-handler";

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		// Check if this is a webhook API request
		const webhookResponse = await handleWebhookAPI(request, env);
		if (webhookResponse) {
			return webhookResponse;
		}

		// React Router SSR
		const context = new RouterContextProvider();
		context.set(cloudflareContext, { env, ctx });
		return requestHandler(request, context);
	},
} satisfies ExportedHandler<Env>;
