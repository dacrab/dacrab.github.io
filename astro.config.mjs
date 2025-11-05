import { defineConfig } from "astro/config";
// Note: React integration removed; no React components in this project

// https://astro.build/config
export default defineConfig({
	site: "https://dacrab.github.io",
	base: "/",
	integrations: [],
	build: {
		assets: "assets",
	},
	vite: {
		build: {
			sourcemap: false,
			rollupOptions: {
				onwarn(warning, defaultHandler) {
					// Silence unused external import warnings originating from node_modules
					if (
						warning &&
						(warning.code === "UNUSED_EXTERNAL_IMPORT" || warning.code === "UNUSED_IMPORT") &&
						typeof warning.id === "string" &&
						warning.id.includes("node_modules")
					) {
						return;
					}
					// Silence specific warnings from @astrojs/internal-helpers
					if (
						warning &&
						typeof warning.id === "string" &&
						warning.id.includes("@astrojs/internal-helpers/remote")
					) {
						return;
					}
					defaultHandler(warning);
				},
			},
		},
		plugins: [
			{
				name: "suppress-astro-unused-internal-import-warnings",
				configResolved(config) {
					const originalWarn = config.logger.warn;
					config.logger.warn = (msg, options) => {
						try {
							const text = typeof msg === "string" ? msg : msg?.message || "";
							if (
								text.includes("@astrojs/internal-helpers/remote") ||
								text.includes("node_modules/astro/dist/assets/utils/remotePattern.js") ||
								text.includes("node_modules/astro/dist/assets/services/service.js")
							) {
								return; // swallow these specific warnings
							}
						} catch {}
						return originalWarn(msg, options);
					};
				},
			},
		],
		css: {
			devSourcemap: false,
		},
	},
});
