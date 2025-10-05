export function scrollToWithOffset(target: HTMLElement, offsetPx: number) {
  const top =
    target.getBoundingClientRect().top + window.pageYOffset - offsetPx;
  window.scrollTo({ top, behavior: "smooth" });
}
