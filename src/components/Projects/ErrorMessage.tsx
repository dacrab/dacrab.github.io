import React from 'react';

export interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="swiss-card bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 mb-8">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading projects</h3>
          <p className="mt-1 text-xs text-red-700 dark:text-red-300">{message}</p>
          <p className="mt-3 text-xs text-red-700 dark:text-red-300">
            Displaying default projects instead. Try refreshing the page.
          </p>
        </div>
      </div>
    </div>
  );
} 