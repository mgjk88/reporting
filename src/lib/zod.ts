import { z } from "zod";
import v from "validator";

const reportTypeSchema = z.enum(["review" , "user" , "business" , "service" , "other"]);
const userRoleSchema = z.enum(["user", "admin"]);

const userUniqueSchema = z.object({
  name: z.string().optional(),
  email: z.string()
});

export const filterObjSchema = z.object({
  type: reportTypeSchema.optional(),
  target_id: z.coerce.bigint().optional(),
  reason: z.string().optional(),
  description: z.string().optional(),
  submitted_by: z.coerce.bigint().optional(),
  resolved_by: z.coerce.bigint().optional(),
  resolved_at: z.date().optional(),
  created_at: z.date().optional(),
});

export const limitSchema = z.number().optional();

export const offsetSchema = z.number().optional();

export const createReportServerSchema = z.object({
  type: reportTypeSchema,
  target_id: z.coerce.bigint(),
  reason: z.string(),
  description: z.string().optional(),
  submitted_by: z.coerce.bigint().optional(),
});

export const createReportClientSchema = z.object({
    type: reportTypeSchema,
    target_id: z.string().trim().min(1, {message: "target id is required"}).refine((str) => v.isInt(str), {message: "target id must be a whole number"}),
    reason: z.string().trim().min(1, {message: "reason is required"}),
    description: z.string().optional(),
    submitted_by: z.string().optional(),
  });

export const readReportServerSchema = z.object(
  {
    id: z.coerce.string(),
    type: reportTypeSchema,
    target_id: z.coerce.string(),
    reason: z.string(),
    description: z.coerce.string().nullable(),
    submitted_by: z.coerce.string().nullable(),
    resolved_by: z.coerce.string().nullable(),
    resolved_at: z.coerce.date().nullable(),
    submitter: userUniqueSchema,
    resolver: userUniqueSchema.nullable(),
    created_at: z.date(),
  }
)

export const readReportClientSchema = z.object({
  id: z.string(),
  type: reportTypeSchema,
  status: z.string(),
  target_id: z.string(),
  reason: z.string(),
  description: z.string().nullable(),
  created_at: z.date(),
  submitted_by: z.string(),
  resolved_at: z.date().nullable(),
  resolved_by: z.string().nullable(),
});

export const updateReportServerSchema = z.object({
  id: z.coerce.bigint(),
  resolved_by: z.coerce.bigint().nullable(),
  resolved_at: z.coerce.date().nullable()
});

export const loginSchema = z.object({
  email: z.string().trim().min(1, {message: "Email is required"}).email({message: "Must be a valid email"})
});

export const userAuthSchema = z.object({
    id: z.coerce.string(),
    role: userRoleSchema
})