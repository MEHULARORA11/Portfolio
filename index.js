import 'dotenv/config'
import express from 'express'
import {sendEmailToMehul} from './email.js'
import cors from 'cors'
import {redis} from './redis.js'

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

let localGithubFallback = null;

const getContributionLevel = (count) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

app.get('/api/github-contributions', async (req, res) => {
  const username = process.env.GITHUB_USERNAME || 'MEHULARORA11';
  const token = process.env.GITHUB_TOKEN;
  const cacheKey = `github:contributions:${username}`;

  // 1. Check Redis cache first
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
  } catch (err) {
    console.error("Redis error checking GitHub contribution cache:", err.message);
  }

  // 2. Degrade gracefully if token missing
  if (!token) {
    return res.status(200).json({
      error: true,
      message: "GITHUB_TOKEN environment variable is not configured."
    });
  }

  // 3. Fetch from GitHub GraphQL API v4
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

    // 4. Cache shaped result in Redis with TTL of 1 hour (3600 seconds).
    // Tradeoff: 1 hour TTL keeps graph updated while respecting GitHub GraphQL API rate limits.
    try {
      await redis.set(cacheKey, JSON.stringify(shapedData), 'EX', 3600);
    } catch (redisErr) {
      console.error("Redis set error for GitHub contributions:", redisErr.message);
      localGithubFallback = shapedData;
    }

    return res.status(200).json(shapedData);
  } catch (err) {
    console.error("GitHub contributions fetch error:", err.message);
    if (localGithubFallback) {
      return res.status(200).json(localGithubFallback);
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