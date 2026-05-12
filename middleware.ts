import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_ROUTES = ['/admin']

const BUSINESS_ROUTES = [
  '/dashboard',
  '/business',
]

const DELIVERY_ROUTES = [
  '/delivery',
]

export async function middleware(
  request: NextRequest
) {

  const path = request.nextUrl.pathname

  const accessToken =
    request.cookies.get(
      'sb-access-token'
    )?.value

  const role =
    request.cookies.get(
      'fasty-role'
    )?.value

  // =========================
  // NO LOGIN
  // =========================

  const protectedRoutes = [
    ...ADMIN_ROUTES,
    ...BUSINESS_ROUTES,
    ...DELIVERY_ROUTES,
  ]

  const isProtected =
    protectedRoutes.some((route) =>
      path.startsWith(route)
    )

  if (
    isProtected &&
    !accessToken
  ) {

    return NextResponse.redirect(
      new URL('/auth', request.url)
    )

  }

  // =========================
  // ADMIN
  // =========================

  if (
    ADMIN_ROUTES.some((route) =>
      path.startsWith(route)
    )
  ) {

    if (role !== 'admin') {

      return NextResponse.redirect(
        new URL('/', request.url)
      )

    }

  }

  // =========================
  // BUSINESS
  // =========================

  if (
    BUSINESS_ROUTES.some((route) =>
      path.startsWith(route)
    )
  ) {

    if (
      role !== 'business' &&
      role !== 'admin'
    ) {

      return NextResponse.redirect(
        new URL('/', request.url)
      )

    }

  }

  // =========================
  // DELIVERY
  // =========================

  if (
    DELIVERY_ROUTES.some((route) =>
      path.startsWith(route)
    )
  ) {

    if (
      role !== 'delivery' &&
      role !== 'admin'
    ) {

      return NextResponse.redirect(
        new URL('/', request.url)
      )

    }

  }

  return NextResponse.next()

}

export const config = {

  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/business/:path*',
    '/delivery/:path*',
  ],

}