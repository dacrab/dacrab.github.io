import { NextResponse } from 'next/server';
import { fetchGitHubRepos } from '@/services/github';

// Configuration
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Constants
const DEFAULT_USERNAME = 'dacrab';
const DEFAULT_SORT = 'updated';
const DEFAULT_DIRECTION = 'desc';

/**
 * Static API route for GitHub data
 * For static export, we need to return a predetermined response
 * without using dynamic URL parameters
 */
export async function GET() {
  try {
    const repos = await fetchGitHubRepos(
      DEFAULT_USERNAME,
      DEFAULT_SORT as "updated" | "created" | "pushed" | "full_name",
      DEFAULT_DIRECTION as "asc" | "desc",
      false
    );
    
    return NextResponse.json(repos);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
}