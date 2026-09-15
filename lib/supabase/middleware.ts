import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
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

  const isPublicRoute = 
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/news') ||
    request.nextUrl.pathname.startsWith('/alumni') ||
    request.nextUrl.pathname.startsWith('/materials') ||
    request.nextUrl.pathname === '/about' ||
    request.nextUrl.pathname === '/schedule'

  const isAuthRoute = 
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // Not logged in but trying to access protected route
  if (!user && (isAdminRoute || isDashboardRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Logged in
  if (user) {
    // Get profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role || 'student'

    // Prevent access to auth routes if already logged in
    if (isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = role === 'admin' ? '/admin' : '/dashboard'
      return NextResponse.redirect(url)
    }

    // Prevent students from accessing admin routes
    if (role === 'student' && isAdminRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    // Prevent admins from accessing student dashboard
    if (role === 'admin' && isDashboardRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
