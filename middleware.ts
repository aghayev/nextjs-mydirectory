import { NextRequest, NextResponse } from 'next/server';

const isDbRoute = (pathname: string) => {
  return pathname.startsWith('/api/db');
}

const isNutritionRoute = (pathname: string) => {
  return pathname.startsWith('/nutrition');
}

const isSwimmingRoute = (pathname: string) => {
  return pathname.startsWith('/swimming');
}

const isHandymanRoute = (pathname: string) => {
  return pathname.startsWith('/handyman');
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Case 1: ACCESS DENIED
  if (isSwimmingRoute(url.pathname) 
  || isHandymanRoute(url.pathname)) {
    return Response.json(
      { success: false, message: 'Access forbidden' },
      { status: 403 }
    )
  }

  // Case 2: www authentication
  if (isDbRoute(url.pathname)
  || isNutritionRoute(url.pathname)) {
    const basicAuth = req.headers.get('authorization')

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')
  
      if (user === 'admin' && pwd === 'admin') {
        return NextResponse.next()
      }
    }

    url.pathname = '/api/login'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/api/db/:path*', 
      '/nutrition/:path*',
      '/swimming/:path*', 
      '/handyman/:path*'
    ]
};