import { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
const SectionHeader = memo(function SectionHeader() {
  return (
    <div className="mb-16">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-[var(--accent)] mr-4"></div>
        <h2 className="swiss-heading-2">EXPERIENCE</h2>
      </div>
      <div className="ml-12">
        <div className="w-24 h-1 bg-[var(--foreground)] mb-8"></div>
        <p className="swiss-body max-w-2xl">
          A chronological view of my professional journey in web development, 
          showcasing my roles, responsibilities, and growth over time.
        </p>
      </div>
    </div>
  );
});

export default SectionHeader; 