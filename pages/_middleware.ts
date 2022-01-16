import {NextApiRequest} from 'next';
import {NextRequest, NextResponse} from 'next/server';
import {getToken} from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Token will exist if user is logged in
  const token = await getToken({req: req as unknown as NextApiRequest, secret: process.env.JWT_SECRET!});
  const {pathname} = req.nextUrl;

  // Allow the requests if the following is true.
  // 1) It's a request for next-auth session & provider fetching
  // 2) requesting public assets
  // 3) the token exists
  if (pathname.includes('/api/auth') || pathname.includes('/assets') || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have token AND are requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
