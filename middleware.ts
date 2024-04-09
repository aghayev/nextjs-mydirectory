import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
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
  return pathname.startsWith("/api/ping")
};

const fetchLocationByIP = async () => {
  const request = await fetch("https://ipapi.co/json/");
  const jsonResponse = await request.json();
  return jsonResponse.country;
};

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
    const excludeList = ["US", "JP", "AU", "ES"]

    const countryCode = await fetchLocationByIP()
    if (excludeList.includes(countryCode)) {
      return Response.json(
        { success: false, message: "This store is unavailable in your region" },
        { status: 403 }
      );
    }
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
