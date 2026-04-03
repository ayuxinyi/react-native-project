import { auth } from "@react-native-project/auth";
import { env } from "@react-native-project/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// 创建 Hono 实例，用于处理 HTTP 请求
const app = new Hono()
  .use(logger())
  // 允许跨域请求
  .use(
    // 所有路由
    "/*",
    // 允许的来源
    cors({
      // 允许的来源
      origin: env.CORS_ORIGIN,
      // 允许的请求方法
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      // 允许的请求头
      allowHeaders: ["Content-Type", "Authorization", "Cookie"],
      // 是否允许携带凭证
      credentials: true,
    }),
  )
  // 处理 /api/auth/* 路由
  // 当请求方法为 POST 或 GET 时，调用 auth.handler 处理请求
  .on(["POST", "GET"], "/api/auth/*", c => auth.handler(c.req.raw));

// 处理服务器错误
app.onError((err, c) => {
  console.error("[服务器错误]", err);
  return c.json(
    {
      error: err.message || "服务器错误",
      // 如果环境开发，返回栈跟踪
      ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    },
    500,
  );
});

// 处理 404 错误
app.notFound(c => c.text("404 Not Found", 404));

// 导出 Hono 实例类型
// 用于在其他文件中定义路由和中间件
export type AppType = typeof app;
export default app;
