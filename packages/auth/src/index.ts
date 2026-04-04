import { expo } from "@better-auth/expo";
import { createDb } from "@react-native-project/db";
import * as schema from "@react-native-project/db/schema/auth";
import { env } from "@react-native-project/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// 开发环境允许所有来源，生产环境只允许指定的来源
const devOrigins = env.NODE_ENV === "development" ? ["*"] : [];

export function createAuth() {
  const db = createDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",

      schema: schema,
    }),
    user: {
      additionalFields: {
        onboardingCompleted: {
          type: "boolean",
          required: false,
          input: true,
        },
        country: {
          type: "string",
          required: false,
          input: true,
        },
        phone: {
          type: "string",
          required: false,
          input: true,
        },
        currency: {
          type: "string",
          required: false,
          input: true,
        },
      },
    },
    // 允许的来源
    trustedOrigins: [
      env.CORS_ORIGIN,
      "cashory://",
      "cashory.exp.direct://",
      "mybettertapp://",
      "react-native-project://",
      ...devOrigins,
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
