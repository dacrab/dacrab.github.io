import { motion } from "framer-motion";

interface ErrorMessageProps {
  error: Error;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-8 text-center max-w-3xl mx-auto"
    >
      <h3 className="text-xl font-bold mb-2 text-red-500">GitHub API Error</h3>
      
      {error.message.includes("rate limit exceeded") ? (
        <>
          <p className="text-muted mb-4">
            We've hit GitHub's rate limits. This typically happens when making too many requests without authentication.
          </p>
          <div className="bg-card/30 p-4 rounded-lg text-left mb-4 text-sm font-mono overflow-auto">
            <p>{error.message}</p>
          </div>
          <p className="text-sm text-muted mb-2">To fix this issue:</p>
          <ul className="text-sm text-muted list-disc list-inside text-left max-w-md mx-auto">
            <li>Generate a GitHub personal access token</li>
            <li>Add it to your .env.local file as GITHUB_ACCESS_TOKEN</li>
            <li>Restart your development server</li>
          </ul>
        </>
      ) : error.message.includes("not found") ? (
        <>
          <p className="text-muted mb-2">The GitHub username could not be found.</p>
          <p className="text-sm text-muted">Check your NEXT_PUBLIC_GITHUB_USERNAME value in .env.local</p>
        </>
      ) : (
        <p className="text-muted">
          {error.message || "An unexpected error occurred while fetching your GitHub projects."}
        </p>
      )}
      
      <p className="text-muted text-sm mt-4">Displaying example projects instead.</p>
    </motion.div>
  );
} 