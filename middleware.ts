import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define standard CORS options
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

export function middleware(request: NextRequest) {
  // Only apply this to API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    console.log("hulla")
    const origin = request.headers.get("origin") ?? "";
    const host = request.headers.get("host"); // e.g., localhost:3000

    // Check if the origin matches the host (same-origin) or an allowed external origin
    let isAllowedOrigin = false;
    
    try {
      if (origin) {
        const originUrl = new URL(origin);
        if (originUrl.host === host) {
          isAllowedOrigin = true;
        } else {
          // Check allowed external origins if any are specified in env
          const allowedOriginsStr = process.env.ALLOWED_ORIGINS || "";
          const allowedOrigins = allowedOriginsStr.split(",").map(s => s.trim()).filter(Boolean);
          if (allowedOrigins.includes(origin)) {
            isAllowedOrigin = true;
          }
        }
      }
    } catch (e) {
      // Ignore malformed origin
    }

    // Handle OPTIONS preflight requests
    const isPreflight = request.method === "OPTIONS";

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...corsOptions,
      };
      // Return empty response with CORS headers for preflight
      return NextResponse.json({}, { headers: preflightHeaders });
    }

    // Handle simple requests
    const response = NextResponse.next();

    // If it's a cross-origin request from an allowed origin, set the header
    if (isAllowedOrigin && origin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    // Set standard CORS headers
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
