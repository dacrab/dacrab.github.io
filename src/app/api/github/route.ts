import { NextResponse } from 'next/server';
import { fetchGitHubRepos } from '@/services/github';

/**
 * Static API route for GitHub data
 * For static export, we need to return a predetermined response
 * without using dynamic URL parameters
 */

// Add required configuration for static export
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export async function GET() {
  try {
    // For static export, we'll use default parameters
    const username = 'dacrab'; // Default username
    const sort = 'updated'; // Default sort
    const direction = 'desc'; // Default direction
    
    // Use the centralized GitHub service
    const repos = await fetchGitHubRepos(
      username, 
      sort as "updated" | "created" | "pushed" | "full_name", 
      direction as "asc" | "desc",
      false
    );
    
    return NextResponse.json(repos);
  } catch (error) {
    console.error('GitHub API error:', error);
    
    // Create appropriate error response
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
} 