import { cookies } from "next/headers";
export async function POST() {
    (await cookies()).delete("auth");
  return Response.json({ redirect: "/" }, { status: 200 });
}
