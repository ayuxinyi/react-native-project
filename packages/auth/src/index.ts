import { expo } from "@better-auth/expo";
import { createDb } from "@react-native-project/db";
import * as schema from "@react-native-project/db/schema/auth";
import { env } from "@react-native-project/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function createAuth() {
  const db = createDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",

      schema: schema,
    }),
    // 允许的来源
    trustedOrigins: [
      env.CORS_ORIGIN,
      "cashory://",
      "cashory.exp.direct://",
      "mybettertapp://",
      "react-native-project://",
      ...(env.NODE_ENV === "development"
        ? [
            "exp://",
            "exp://**",
            "exp://192.168.*.*:*/**",
            "http://localhost:8081",
            "http://localhost:*",
            "http://192.168.*:*",
          ]
        : []),
    ],
    emailAndPassword: {
      enabled: true,
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
    },
    plugins: [expo()],
  });
}

export const auth = createAuth();
