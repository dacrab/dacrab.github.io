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
  const fileName = `CV_Vaggelis_Kavouras_${lang === "english" ? "English" : "Greek"}.pdf`;
  link.href = `/assets/cv/${fileName}`;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 