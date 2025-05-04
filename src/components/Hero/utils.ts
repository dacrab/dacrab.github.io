/**
 * Helper function for smooth scrolling to an element by ID
 * @param elementId ID of the element to scroll to
 */
export const smoothScroll = (elementId: string): void => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Helper function to handle CV download
 * @param lang Language of the CV to download
 */
export const handleCVDownload = (lang: string): void => {
  const link = document.createElement("a");
  link.href = `/CV_${lang}.pdf`;
  link.setAttribute("download", `CV_${lang}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 