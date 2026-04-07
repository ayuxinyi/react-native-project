import z from "zod";

export const createWalletSchema = z.object({
  name: z
    .string("请输入钱包名称")
    .min(1, "请输入钱包名称")
    .max(100, "钱包名称最多100个字符"),
  type: z.enum(["bank", "credit", "cash", "mobile"]),
  icon: z.string().optional(),
  currency: z
    .string()
    .min(1, "请输入货币")
    .max(10, "货币最多10个字符")
    .optional(),
  isDefault: z.boolean().optional(),
});

export const updateWalletSchema = createWalletSchema.partial();

export type CreateWalletInput = z.infer<typeof createWalletSchema>;
export type UpdateWalletInput = z.infer<typeof updateWalletSchema>;
