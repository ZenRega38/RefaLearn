import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { safeNextPath } from '@/lib/redirect'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/forgot-password')
  const isAdminRoute = path.startsWith('/admin')
  const isDashboardRoute = path.startsWith('/dashboard')
  const isResetRoute = path.startsWith('/reset-password')

  const redirectTo = (pathname: string, next?: string) => {
    const url = request.nextUrl.clone()
    url.pathname = pathname
    url.search = ''
    if (next) url.searchParams.set('next', next)
    return NextResponse.redirect(url)
  }

  // Not logged in but trying to access protected route — remember where
  // they were going so login can send them back.
  if (!user && (isAdminRoute || isDashboardRoute || isResetRoute)) {
    return redirectTo('/login', isResetRoute ? undefined : path + request.nextUrl.search)
  }

  // Logged in
  if (user && (isAuthRoute || isAdminRoute || isDashboardRoute)) {
    // Get profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role || 'student'
    const home = role === 'admin' ? '/admin' : '/dashboard'

    // Prevent access to auth routes if already logged in
    if (isAuthRoute) {
      const next = safeNextPath(request.nextUrl.searchParams.get('next'), home)
      // Don't send a student to /admin or an admin to /dashboard.
      const allowed = role === 'admin' ? !next.startsWith('/dashboard') : !next.startsWith('/admin')
      return NextResponse.redirect(new URL(allowed ? next : home, request.url))
    }

    // Prevent students from accessing admin routes
    if (role === 'student' && isAdminRoute) {
      return redirectTo('/dashboard')
    }

    // Prevent admins from accessing student dashboard
    if (role === 'admin' && isDashboardRoute) {
      return redirectTo('/admin')
    }
  }

  return supabaseResponse
}
