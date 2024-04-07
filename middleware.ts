import { NextRequest, NextResponse } from 'next/server';

const isNutritionRoute = (pathname: string) => {
  return pathname.startsWith('/nutrition');
}

const isSwimmingRoute = (pathname: string) => {
  return pathname.startsWith('/swimming');
}

const isHandymanRoute = (pathname: string) => {
  return pathname.startsWith('/handyman');
}

const isDbRoute = (pathname: string) => {
  return pathname.startsWith('/api/db');
}


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl;

  if (isSwimmingRoute(pathname) || isHandymanRoute(pathname)) {
    return Response.json(
      { success: false, message: 'Under construction' },
      { status: 401 }
    )
  }

  if (isNutritionRoute(pathname) || isDbRoute(pathname)) {
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
    matcher: ['/api/db/:path*', '/nutrition/:path*', '/swimming/:path*', '/handyman/:path*']
};