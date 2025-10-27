import { scrollToWithOffset } from "@/utils/scroll";

export function initIndexEnhancements() {
	type IndexEnhancementsFlag = { __indexEnhancements?: boolean };
	const w = window as unknown as IndexEnhancementsFlag;
	if (w.__indexEnhancements) {
		return;
	}
	w.__indexEnhancements = true;

	document.addEventListener("DOMContentLoaded", () => {
		try {
			document.body.classList.add("loaded");
		} catch {
			// Intentionally ignore if document/body not available
		}

		// Smooth anchor scrolling for non-nav links
		const anchors = document.querySelectorAll<HTMLAnchorElement>(
			'a[href^="#"]:not([data-nav-link])',
		);
		for (const anchor of anchors) {
			anchor.addEventListener("click", (e) => {
				e.preventDefault();
				const targetId = anchor.getAttribute("href")?.substring(1);
				const target = targetId ? document.getElementById(targetId) : null;
				if (target) {
					scrollToWithOffset(target, 60);
				}
			});
		}

		// Section reveal animations
		try {
			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							entry.target.classList.add("revealed");
						}
					}
				},
				{ threshold: 0.1, rootMargin: "0px" },
			);
			const sections = document.querySelectorAll("section");
			for (const section of sections) {
				section.classList.add("reveal-element");
				observer.observe(section);
			}
		} catch {
			// IntersectionObserver unsupported or DOM not ready; skip enhancements
		}
	});
}
