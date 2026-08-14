import { NextResponse } from "next/server";
import { redis } from "@/lib/backend/redis";

const getContributionLevel = (count: number) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

export async function GET() {
  const username = process.env.GITHUB_USERNAME || 'MEHULARORA11';
  const token = process.env.GITHUB_TOKEN;
  const cacheKey = `github:contributions:${username}`;
  const fallbackCacheKey = `github:contributions:${username}:fallback`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      });
    }
  } catch (err: any) {
    console.error("Redis error checking GitHub contribution cache:", err.message);
  }

  const getFallbackData = async () => {
    try {
      const storedFallback = await redis.get(fallbackCacheKey);
      if (storedFallback) return JSON.parse(storedFallback);
    } catch (e: any) {
      console.error("Redis error reading fallback cache:", e.message);
    }
    return null;
  };

  if (!token) {
    const fallback = await getFallbackData();
    if (fallback) return NextResponse.json(fallback);
    return NextResponse.json({
      error: true,
      message: "GITHUB_TOKEN environment variable is not configured."
    }, { status: 500 });
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  weekday
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App'
      },
      body: JSON.stringify({ query, variables: { username } })
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.errors || !result.data?.user?.contributionsCollection?.contributionCalendar) {
      throw new Error(result.errors?.[0]?.message || 'Invalid data returned from GitHub API');
    }

    const calendar = result.data.user.contributionsCollection.contributionCalendar;

    const shapedData = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week: any) => ({
        days: week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          weekday: day.weekday,
          level: getContributionLevel(day.contributionCount)
        }))
      }))
    };

    try {
      await redis.set(cacheKey, JSON.stringify(shapedData), 'EX', 30);
      await redis.set(fallbackCacheKey, JSON.stringify(shapedData));
    } catch (redisErr: any) {
      console.error("Redis set error for GitHub contributions:", redisErr.message);
    }

    return NextResponse.json(shapedData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (err: any) {
    console.error("GitHub contributions fetch error:", err.message);
    const fallback = await getFallbackData();
    if (fallback) {
      return NextResponse.json(fallback, {
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
      });
    }
    return NextResponse.json({
      error: true,
      message: err.message || "Failed to fetch contribution data"
    }, { status: 500 });
  }
}
