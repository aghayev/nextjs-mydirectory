import { NextRequest, NextResponse } from "next/server";

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
  return pathname.startsWith("/handyman") || pathname.startsWith("/swimming");
};

const isGeoipRoute = (pathname: string) => {
  return pathname.startsWith("/api/ping");
};

const isRateLimitRoute = (pathname: string) => {
  return pathname.startsWith("/reduxcounter");
};

const fetchLocationByIP = async () => {
  const request = await fetch("https://ipapi.co/json/");
  const jsonResponse = await request.json();
  return jsonResponse.country;
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

  // Auth, session storage
  if (isProtectedRoute(url.pathname)) {
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [user, pwd] = atob(authValue).split(":");

      if (user === "admin" && pwd === "admin") {
        return NextResponse.next();
      }
    }

    url.pathname = "/api/login";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
