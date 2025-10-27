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
		},
		css: {
			devSourcemap: false,
		},
	},
});
