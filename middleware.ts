import { NextRequest, NextResponse } from "next/server";
import { RateLimiter } from "./lib/ratelimiter";

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
  const response = await fetch("http://localhost:3002/api/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId: sessionId,
    }),
  });

  const res = await response.json();
  return res.items;
};

const rateLimiter = new RateLimiter();

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
    const ipData = rateLimiter.setIpData(ip)

    if (rateLimiter.tooManyRequests(ipData)) {
      return Response.json(
        { success: false, message: "Too Many Requests" },
        { status: 429 }
      );
    }

    rateLimiter.increaseCount(ipData)
  }

  // Protected, Session storage
  if (isProtectedRoute(url.pathname)) {
    const session = req.cookies.get("sessionId");

    if (!session) {
      url.pathname = "/protected";
    }

    if (session) {
      const dbsession = await validateSession(session?.value);

      if (!dbsession || dbsession === undefined) {
        req.cookies.delete(session?.value);
        url.pathname = "/protected";
      }

      // Authorization
      if (dbsession && dbsession.role !== "admin") {
        return Response.json(
          {
            success: false,
            message: "No admin access rights to view the content",
          },
          { status: 403 }
        );
      }
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
