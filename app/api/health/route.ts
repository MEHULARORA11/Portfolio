import { NextResponse } from "next/server";

export function GET(req: Request){
    const secFetchSite = req.headers.get("sec-fetch-site");
    const referer = req.headers.get("referer");
    
    // Check for cron secret via Authorization header, custom header, or URL query parameter
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const cronHeader = req.headers.get("x-cron-secret");
    
    const { searchParams } = new URL(req.url);
    const cronQuery = searchParams.get("cron_secret");

    const expectedSecret = process.env.CRON_SECRET;
    
    const isBrowser = Boolean(secFetchSite || referer);
    // Only validate cron if the secret is actually configured in the environment
    const isCron = Boolean(expectedSecret && (authHeader === expectedSecret || cronHeader === expectedSecret || cronQuery === expectedSecret));

    if (!isBrowser || !isCron) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({health:"ok"})
}