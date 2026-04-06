import { env } from "@react-native-project/env/server";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";
export * from "drizzle-orm";

export function createDb() {
  return drizzle(env.DATABASE_URL, { schema, casing: "snake_case" });
}

export const db = createDb();
