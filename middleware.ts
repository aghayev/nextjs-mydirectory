import { NextRequest, NextResponse } from "next/server";

const isDbRoute = (pathname: string) => {
  return pathname.startsWith("/api/db");
};

const isNutritionRoute = (pathname: string) => {
  return pathname.startsWith("/nutrition");
};

const isSwimmingRoute = (pathname: string) => {
  return pathname.startsWith("/swimming");
};

const isHandymanRoute = (pathname: string) => {
  return pathname.startsWith("/handyman");
};

const fetchLocationByIP = async () => {
  const request = await fetch("https://ipapi.co/json/");
  const jsonResponse = await request.json();
  return jsonResponse.country;
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;

  // Case 1: Restrict if some paths are under construction
  if (isSwimmingRoute(url.pathname) || isHandymanRoute(url.pathname)) {
    return Response.json(
      { success: false, message: "Access forbidden" },
      { status: 403 }
    );
  }

  if (isDbRoute(url.pathname) || isNutritionRoute(url.pathname)) {
    // case 2: Restrict based on geolocation
    // Nextjs docs has geo param included within request
    // However, it depends if server supports it, if u deploy to Vercel it is not null, on local unable to test

    const countryCode = await fetchLocationByIP();
    if (countryCode.includes('US')) {
      return Response.json(
        { success: false, message: "This store is unavailable in your region" },
        { status: 403 }
      );
    }

    // Case 3: www authentication
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

export const config = {
  matcher: [
    "/api/db/:path*",
    "/nutrition/:path*",
    "/swimming/:path*",
    "/handyman/:path*",
  ],
};
