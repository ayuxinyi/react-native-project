import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const categoryTypes = ["expense", "income"] as const;
export type CategoryType = (typeof categoryTypes)[number];
export const categoryTypeEnum = pgEnum("category_type", categoryTypes);

export const CategoryTable = pgTable(
  "category",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text().notNull(),
    emoji: text(),
    type: categoryTypeEnum().notNull(),
    color: text(),
    sortOrder: integer().notNull().default(0),
    isSystem: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  table => [
    index("category_userId_idx").on(table.userId),
    index("category_type_idx").on(table.type),
  ],
);

export type CategoryInsert = typeof CategoryTable.$inferInsert;
export type CategorySelect = typeof CategoryTable.$inferSelect;
