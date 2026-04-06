/**
 * @file 公共参数校验
 */
import z from "zod";

/**
 * @file ID参数校验
 */
export const idParamSchema = z.object({
  id: z
    .string("ID不能为空")
    .min(1, "ID不能为空")
    .max(100, "ID不能超过100个字符"),
});
