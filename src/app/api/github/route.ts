import { NextResponse } from 'next/server';

const GITHUB_API_URL = "https://api.github.com";
const DEFAULT_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "dacrab";

/**
 * API route to fetch GitHub repositories
 * This approach keeps the GitHub token secure on the server side
 */
export async function GET(request: Request) {
  // Get parameters from URL
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || DEFAULT_USERNAME;
  const sort = searchParams.get('sort') || 'updated';
  const direction = searchParams.get('direction') || 'desc';
  
  try {
    // Set up headers with authentication
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Add GitHub token from server environment 
    if (process.env.GITHUB_ACCESS_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_ACCESS_TOKEN}`;
    }
    
    console.log(`API: Fetching GitHub repos for username: ${username}`);
    
    // Make authenticated request to GitHub API
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=100`,
      { headers }
    );
    
    // Handle rate limiting specifically
    if (response.status === 403) {
      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
      const rateLimitReset = response.headers.get('X-RateLimit-Reset');
      
      if (rateLimitRemaining === '0') {
        const resetDate = rateLimitReset 
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() 
          : 'unknown time';
        
        console.error(`API: GitHub rate limit exceeded. Resets at ${resetDate}`);
        
        return NextResponse.json(
          { error: `GitHub API rate limit exceeded. Try again after ${resetDate}.` },
          { status: 429 }
        );
      }
    }
    
    // Handle other errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API: GitHub error (${response.status}): ${errorText}`);
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: `GitHub user '${username}' not found` },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: `GitHub API error: ${response.status} - ${response.statusText}` },
        { status: response.status }
      );
    }
    
    // Return successful data
    const data = await response.json();
    console.log(`API: Successfully fetched ${data.length} repositories`);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API: Error fetching GitHub repositories:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
} 