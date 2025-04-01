import "@/utils/db";
import { NextRequest } from "next/server";
import { createReport, readReports } from "@/utils/db";
import {
  createReportServerSchema,
  limitSchema,
  offsetSchema,
  readReportServerSchema,
} from "@/lib/zod";

export async function GET(req: NextRequest) {
  //for large datasets, have to implement pagination
  const searchParams = req.nextUrl.searchParams;
  const limitValidRes = limitSchema.safeParse(
    searchParams.get("limit") ?? undefined
  );
  const offsetValidRes = offsetSchema.safeParse(
    searchParams.get("offset") ?? undefined
  );
  if (!limitValidRes.success || !offsetValidRes.success)
    return Response.json(null, { status: 400 });
  
  const res = await readReports({
    limit: limitValidRes.data,
    offset: offsetValidRes.data,
  });
  if (!res.success) return Response.json({error: res.message}, { status: 500 });
  
  //parse BigInt into string
  const parsedRes = res.reports?.map((report) => {
    return readReportServerSchema.safeParse(report).data;
  }); 
  return Response.json({ reports: parsedRes }, { status: 200 });
}

export async function POST(req: Request) {
  const validRes = createReportServerSchema.safeParse(await req.json());
  if (!validRes.success) {
    return Response.json(null, { status: 400 });
  }

  const res = await createReport(validRes.data);
  if (!res.success) return Response.json({error: res.message}, { status: 500 });
  return Response.json(null, { status: 201 });
}
