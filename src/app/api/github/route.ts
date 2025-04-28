import { NextResponse } from 'next/server';
import { fetchGitHubRepos } from '@/services/github';

/**
 * @description API route handler to fetch GitHub repositories for a given user.
 * Uses the centralized GitHub service with built-in caching.
 * @param request The incoming Next.js API request object.
 * @returns A NextResponse object containing the repository data or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'dacrab';
  const sort = searchParams.get('sort') || 'updated';
  const direction = searchParams.get('direction') || 'desc';
  const forceFresh = searchParams.get('forceFresh') === 'true';
  
  try {
    // Use the centralized GitHub service
    const repos = await fetchGitHubRepos(
      username, 
      sort as "updated" | "created" | "pushed" | "full_name", 
      direction as "asc" | "desc",
      forceFresh
    );
    
    return NextResponse.json(repos);
  } catch (error) {
    console.error('GitHub API error:', error);
    
    // Create appropriate error responses
    if (error instanceof Error) {
      if (error.message.includes('rate limit exceeded')) {
        return NextResponse.json(
          { error: error.message },
          { status: 429 }
        );
      } else if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
} 