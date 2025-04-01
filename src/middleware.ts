import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const [roleReq, idReq] = path.split("/").slice(1);

    const authCookie = req.cookies.get("auth");
    if (!authCookie) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    const secret = new TextEncoder().encode(process.env.SECRET);
    const { payload } = await jose.jwtVerify(authCookie.value, secret);
    const { role, id } = payload;
    if (!role || !id || typeof role !== "string" || typeof id !== "string") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (role !== roleReq || id !== idReq) {
      return NextResponse.redirect(
        new URL(`${role}/${id}`, req.nextUrl.origin)
      );
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/admin/:id*", "/user/:id*"],
};
