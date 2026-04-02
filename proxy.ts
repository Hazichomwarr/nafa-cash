import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (!isAdminRoute) return NextResponse.next();

  const auth = req.headers.get("authorization");

  if (!auth) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const base64 = auth.split(" ")[1];
  const decoded = atob(base64);

  const [username, password] = decoded.split(":");

  if (password === process.env.ADMIN_SECRET) {
    return NextResponse.next();
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
export const config = {
  matcher: ["/admin/:path*"],
};
