import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createReport({
  type,
  target_id,
  reason,
  description,
  submitted_by,
}: {
  type: ReportType;
  target_id: bigint;
  reason: string;
  description?: string;
  submitted_by?: bigint;
}) {
  try {
    await prisma.report.create({
      data: {
        type,
        target_id,
        reason,
        description,
        submitted_by,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "unknown error",
    };
  }
}

export async function readReports({
  filter = {},
  sort = [],
  offset = 0,
  limit = 20,
}: ReportsQuery) {
  try {
    const reports = await prisma.report.findMany({
      where: filter,
      orderBy: sort,
      skip: offset,
      take: limit,
      include: {
        submitter: { select: { email: true, name: true } },
        resolver: { select: { email: true, name: true } },
      },
    });
    return { success: true, reports };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "unknown error",
    };
  }
}

export async function updateReport({
  id,
  type,
  target_id,
  reason,
  description,
  submitted_by,
  resolved_by,
  resolved_at,
}: {
  id: bigint;
  type?: ReportType;
  target_id?: bigint;
  reason?: string;
  description?: string | null;
  submitted_by?: bigint | null;
  resolved_by?: bigint | null;
  resolved_at?: Date | null;
}) {
  try {
    const report = await prisma.report.update({
      data: {
        type,
        target_id,
        reason,
        description,
        submitted_by,
        resolved_by,
        resolved_at,
      },
      where: {
        id,
      },
      include:{
        submitter: { select: { email: true, name: true } },
        resolver: { select: { email: true, name: true } },
      }
    });
    return { success: true, report};
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "unknown error",
    };
  }
}

export async function readUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "user not found",
      };
    }
    return { success: true, user };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "unknown error",
    };
  }
}
