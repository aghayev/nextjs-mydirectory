import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/db/auth";

export const config = {
  matcher: [
    "/reduxcounter",
    "/api/ping",
    "/api/db/:path*",
    "/nutrition/:path*",
    "/swimming/:path*",
    "/handyman/:path*",
  ],
};

const isProtectedRoute = (pathname: string) => {
  return pathname.startsWith("/api/db") || pathname.startsWith("/nutrition");
};

const isRestrictedRoute = (pathname: string) => {
  return pathname.startsWith("/swimming");
};

const isGeoipRoute = (pathname: string) => {
  return pathname.startsWith("/api/ping");
};

const isRateLimitRoute = (pathname: string) => {
  return pathname.startsWith("/handyman");
};

const fetchLocationByIP = async () => {
  const request = await fetch("https://ipapi.co/json/");
  const jsonResponse = await request.json();
  return jsonResponse.country;
};

const validateSession = async (sessionId: string) => {
  const response = await fetch('http://localhost:3002/api/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId: sessionId,
    }),
  })

  const res = await response.json();
  return res.items
};

const rateLimitMap = new Map();

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;

  // Restricted, if some paths are under construction
  if (isRestrictedRoute(url.pathname)) {
    return Response.json(
      { success: false, message: "Access forbidden" },
      { status: 403 }
    );
  }

  // Protected, based on Geolocation
  // Nextjs docs has geo param included within request
  // However, it depends if server supports it, if u deploy to Vercel it is not null, on local unable to test
  if (isGeoipRoute(url.pathname)) {
    const excludeList = ["US", "JP", "AU", "ES"];

    const countryCode = await fetchLocationByIP();
    if (excludeList.includes(countryCode)) {
      return Response.json(
        { success: false, message: "This store is unavailable in your region" },
        { status: 403 }
      );
    }
  }

  if (isRateLimitRoute(url.pathname)) {
    const ip = req.headers.get("x-forwarded-host"); // x-forwarded-for on local is empty
    const limit = 5; // Limiting requests to 5 per minute per IP
    const windowMs = 60 * 1000; // 1 minute

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      return Response.json(
        { success: false, message: "Too Many Requests" },
        { status: 429 }
      );
    }

    ipData.count += 1;
  }

  // Protected, Session storage
  if (isProtectedRoute(url.pathname)) {

  const session = req.cookies.get('sessionId');

  if (!session) {
    url.pathname = "/protected";
  }

  if (session) {
    const dbsession = await validateSession(session?.value)

    if (!dbsession) {
      req.cookies.delete(session?.value)
      url.pathname = "/protected";
    }
    console.log(dbsession)

    /*


    // Authorization
    if (dbsession.role !== 'admin') {
      return Response.json(
        { success: false, message: "No admin access rights to view the content" },
        { status: 403 }
      )
    }
    */      
  }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
