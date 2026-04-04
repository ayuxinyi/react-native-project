import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string("请输入姓名")
    .trim()
    .min(1, "姓名不能为空")
    .min(2, "姓名不能少于2个字符"),
  email: z
    .email("你的邮箱地址不完整，请确保格式正确并包含域名。")
    .trim()
    .min(1, "邮箱不能为空"),
  password: z.string().min(1, "密码不能为空").min(8, "密码不能少于8个字符"),
});

export const signInSchema = z.object({
  email: z.email("请输入邮箱地址").trim().min(1, "邮箱不能为空"),
  password: z.string().min(1, "密码不能为空").min(8, "密码不能少于8个字符"),
});
