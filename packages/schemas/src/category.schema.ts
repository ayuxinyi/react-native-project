import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1).max(50),
  emoji: z.string().optional(),
  type: z.enum(["expense", "income"]),
  color: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

export const updateCategorySchema = createCategorySchema.omit({
  type: true,
});

export const listCategorySchema = z.object({
  type: z.enum(["expense", "income"]).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type ListCategoryInput = z.infer<typeof listCategorySchema>;
