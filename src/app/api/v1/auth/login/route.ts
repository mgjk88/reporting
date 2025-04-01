import { loginSchema, userAuthSchema } from "@/lib/zod";
import { readUser } from "@/utils/db";
import * as jose from "jose";
import { cookies } from "next/headers";


export async function POST(req: Request) {
  const validRes = loginSchema.safeParse(await req.json());
  if (!validRes.success) return Response.json(null, { status: 400 });
  const res = await readUser(validRes.data?.email);
  if (!res.success && res.message === "user not found")
    return Response.json({error: res.message}, { status: 401});
  const secret = new TextEncoder().encode(process.env.SECRET);

  const parsedRes = userAuthSchema.safeParse(res.user);
  if (!parsedRes.success) return Response.json(null, { status: 500 });
  const jwt = await new jose.SignJWT(parsedRes.data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  (await cookies()).set("auth", jwt);
  return Response.json({
    redirect: `/${parsedRes.data.role}/${parsedRes.data.id}`,
  });
}
