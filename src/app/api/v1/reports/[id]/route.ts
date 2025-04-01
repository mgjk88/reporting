import { updateReport } from "@/utils/db";
import { readReportServerSchema, updateReportServerSchema } from "@/lib/zod";

export async function PATCH(req: Request){
    const validInRes = updateReportServerSchema.safeParse(await req.json());
    if(!validInRes.success) return Response.json(null, {status: 400});
    const res = await updateReport(validInRes.data);
    const validOutRes = readReportServerSchema.safeParse(res.report);
    if(validOutRes.success) return Response.json({report: validOutRes.data}, {status: 200});
    else return Response.json({error: res.message}, {status: 500});
}