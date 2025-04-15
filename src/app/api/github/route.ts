import { NextResponse } from 'next/server';

const GITHUB_API_URL = "https://api.github.com";
const DEFAULT_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "dacrab";

/**
 * @description API route handler to fetch GitHub repositories for a given user.
 * It handles authentication using a server-side token (if available)
 * and includes specific error handling for rate limits and user not found errors.
 * @param request The incoming Next.js API request object.
 * @returns A NextResponse object containing the repository data or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || DEFAULT_USERNAME;
  
  // Construct query parameters for the GitHub API request
  const queryParams = new URLSearchParams({
    sort: searchParams.get('sort') || 'updated',
    direction: searchParams.get('direction') || 'desc',
    per_page: '100', // Fetch up to 100 repositories per page
  });

  const githubApiEndpoint = `${GITHUB_API_URL}/users/${username}/repos?${queryParams.toString()}`;

  try {
    // Set up headers, including Authorization if a token is available
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    if (process.env.GITHUB_ACCESS_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_ACCESS_TOKEN}`;
    }

    console.log(`API: Fetching GitHub repos for username: ${username} from ${githubApiEndpoint}`);

    // Make the request to the GitHub API
    const response = await fetch(githubApiEndpoint, { headers });

    // Handle unsuccessful responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API: GitHub API request failed for ${username} (${response.status}): ${errorText}`);

      // Specific handling for rate limiting (403)
      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');

        if (rateLimitRemaining === '0') {
          const resetTime = rateLimitReset
            ? new Date(parseInt(rateLimitReset, 10) * 1000).toLocaleTimeString()
            : 'an unknown time';
          console.warn(`API: GitHub rate limit exceeded for ${username}. Resets at ${resetTime}`);
          return NextResponse.json(
            { error: `GitHub API rate limit exceeded. Please try again after ${resetTime}.` },
            { status: 429 } // Too Many Requests
          );
        }
      }

      // Specific handling for user not found (404)
      if (response.status === 404) {
        console.warn(`API: GitHub user '${username}' not found.`);
        return NextResponse.json(
          { error: `GitHub user '${username}' not found.` },
          { status: 404 }
        );
      }

      // Generic error for other non-OK statuses
      return NextResponse.json(
        { error: `GitHub API error: ${response.status} - ${response.statusText}` },
        { status: response.status }
      );
    }

    // Handle successful response
    const data = await response.json();
    console.log(`API: Successfully fetched ${data.length} repositories for ${username}`);
    return NextResponse.json(data);

  } catch (error: unknown) {
    // Handle unexpected errors during the fetch process
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`API: Unexpected error fetching GitHub repositories for ${username}:`, errorMessage, error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories due to an internal server error.' },
      { status: 500 }
    );
  }
} 