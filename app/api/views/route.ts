import { NextResponse } from "next/server";
import { redis } from "@/lib/backend/redis";
import { inngest } from "@/lib/backend/inngest/client";
import { getViewsCount } from "@/lib/backend/db-helper";

let localViewsFallback = 1;

export async function GET(req: Request) {
  // Prevent access from API clients (Postman, curl, etc.)
  // Browsers automatically send sec-fetch-site or referer, API clients do not by default.
  const secFetchSite = req.headers.get("sec-fetch-site");
  const referer = req.headers.get("referer");

   const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const cronHeader = req.headers.get("x-cron-secret");

  const { searchParams } = new URL(req.url);
   
    const cronQuery = searchParams.get("view_count_secret");
    const expectedSecret = process.env.VIEW_COUNT_SECRET;

     const isBrowser = Boolean(secFetchSite || referer);
    const isCron = Boolean(expectedSecret && (authHeader === expectedSecret || cronHeader === expectedSecret || cronQuery === expectedSecret));

    if (!isBrowser || !isCron) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

  try {
    const { searchParams } = new URL(req.url);
    const incrParam = searchParams.get("incr");

    // Step 1: If Redis is empty or stale (< 500), resync from Postgres
    const viewCountRedis = await redis.get("viewer");
    if (!viewCountRedis || Number(viewCountRedis) < 500) {
      // Redis doesn't have the count or it's suspiciously low — fetch from DB and sync Redis
      const count = await getViewsCount();
      await redis.set("viewer", count);
    }

    // Step 2: Decide whether to increment (controlled by frontend sessionStorage)
    const shouldIncrement = incrParam !== "false";
    let views;

    if (shouldIncrement) {
      // Atomic increment in Redis — no race conditions
      views = await redis.incr("viewer");

      // Fire-and-forget Inngest event to sync the increment to Postgres
      // NOT awaited — exactly like the old Express backend
      inngest.send({ name: "app/views.update" }).catch((err: any) => {
        console.error("Inngest send error (non-blocking):", err.message);
      });
    } else {
      // Just read — no increment (user already counted this session)
      views = await redis.get("viewer");
      if (views === null) {
        views = await redis.incr("viewer");
      }
    }

    return NextResponse.json(
      { views: Number(views) },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err: any) {
    console.error("Redis views error, using in-memory fallback:", err);
    if (new URL(req.url).searchParams.get("incr") !== "false") {
      localViewsFallback += 1;
    }
    return NextResponse.json({ views: localViewsFallback });
  }
}
