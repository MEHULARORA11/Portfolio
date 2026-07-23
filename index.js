import 'dotenv/config'
import express from 'express'
import {sendEmailToMehul} from './email.js'
import cors from 'cors'
import {redis} from './redis.js'
import rateLimit from 'express-rate-limit'

const app = express();
const PORT = process.env.PORT || 80
const BASE_URL = process.env.CLIENT_URL

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    methods:["GET", "POST"],
    origin:BASE_URL
}))

app.get('/', async (_, res) => {
  return res.status(200).json({ message: 'Portfolio API is running' })
})

let localViewsFallback = 1;

app.get('/api/views', async (req, res) => {
  try {
     const shouldIncrement = req.query.incr !== 'false';
     let views;
     if (shouldIncrement) {
        views = await redis.incr('viewer');
     } else {
        views = await redis.get('viewer');
        if (views === null) {
           views = await redis.incr('viewer');
        }
     }
     return res.status(200).json({ views: Number(views) });
  } catch (err) {
     console.error("Redis views error, using in-memory fallback:", err);
     if (req.query.incr !== 'false') {
        localViewsFallback += 1;
     }
     return res.status(200).json({ views: localViewsFallback });
  }
})

const githubContribLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 requests per IP per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: true, message: 'Too many requests, please try again later.' }
});

let localGithubFallback = null;

const getContributionLevel = (count) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

app.get('/api/github-contributions', githubContribLimiter, async (req, res) => {
  // Prevent HTTP response caching across browsers, proxies, and Caddy
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  const username = process.env.GITHUB_USERNAME || 'MEHULARORA11';
  const token = process.env.GITHUB_TOKEN;
  const cacheKey = `github:contributions:${username}`;
  const fallbackCacheKey = `github:contributions:${username}:fallback`;

  // 1. Check Redis short-lived freshness cache (30-second window)
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
  } catch (err) {
    console.error("Redis error checking GitHub contribution cache:", err.message);
  }

  // Helper function to fetch persistent fallback cache
  const getFallbackData = async () => {
    try {
      const storedFallback = await redis.get(fallbackCacheKey);
      if (storedFallback) return JSON.parse(storedFallback);
    } catch (e) {
      console.error("Redis error reading fallback cache:", e.message);
    }
    return localGithubFallback;
  };

  // 2. Degrade gracefully if token missing, serving fallback if available
  if (!token) {
    const fallback = await getFallbackData();
    if (fallback) return res.status(200).json(fallback);
    return res.status(200).json({
      error: true,
      message: "GITHUB_TOKEN environment variable is not configured."
    });
  }

  // 3. Fetch fresh data from GitHub GraphQL API v4
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
      const errorMsg = result.errors?.[0]?.message || 'Invalid data returned from GitHub API';
      throw new Error(errorMsg);
    }

    const calendar = result.data.user.contributionsCollection.contributionCalendar;

    const shapedData = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map(week => ({
        days: week.contributionDays.map(day => ({
          date: day.date,
          count: day.contributionCount,
          weekday: day.weekday,
          level: getContributionLevel(day.contributionCount)
        }))
      }))
    };

    // 4. Update short-lived cache (30s TTL) & persistent fallback cache (no TTL) in Redis
    try {
      await redis.set(cacheKey, JSON.stringify(shapedData), 'EX', 30);
      await redis.set(fallbackCacheKey, JSON.stringify(shapedData));
    } catch (redisErr) {
      console.error("Redis set error for GitHub contributions:", redisErr.message);
    }
    localGithubFallback = shapedData;

    return res.status(200).json(shapedData);
  } catch (err) {
    console.error("GitHub contributions fetch error:", err.message);
    const fallback = await getFallbackData();
    if (fallback) {
      return res.status(200).json(fallback);
    }
    return res.status(200).json({
      error: true,
      message: err.message || "Failed to fetch contribution data"
    });
  }
});

app.post('/api/post', async (req, res) => {
   try {
      const { name, email, message } = req.body;

      await sendEmailToMehul(name, email, message);

      return res.status(200).json({
         success: true,
         message: "Email sent successfully"
      });

   } catch (err) {
      console.log(err);

      return res.status(500).json({
         success: false,
         message: "Failed to send email"
      });
   }
});

app.get('/health',(_,res) => {
   
  return res.status(200).json({message:"ok"});
})

app.listen(PORT,() => {
    console.log(`Server is running On Port ${PORT}`);
})