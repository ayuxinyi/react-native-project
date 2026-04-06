import { auth } from "@react-native-project/auth";
import { createMiddleware } from "hono/factory";

export type AuthEnv = {
  Variables: {
    userId: string;
    userEmail: string;
  };
};

/**
 * 认证中间件
 * 用于验证请求是否已认证
 */
export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session || !session.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("userId", session.user.id);
  c.set("userEmail", session.user.email);

  await next();
});
