import { NextResponse } from 'next/server';
import { GitHubRepo } from '@/types/github';

/**
 * @description API route handler to fetch GitHub repositories for a given user.
 * It handles authentication using a server-side token (if available)
 * and includes specific error handling for rate limits and user not found errors.
 * @param request The incoming Next.js API request object.
 * @returns A NextResponse object containing the repository data or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'dacrab';
  const sort = searchParams.get('sort') || 'updated';
  const direction = searchParams.get('direction') || 'desc';
  
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=10`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Website',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const repos: GitHubRepo[] = await response.json();
    return NextResponse.json(repos);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
} 