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
		css: {
			devSourcemap: false,
		},
	},
});
