import {
  boolean,
  index,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const walletTypes = ["bank", "credit", "cash", "mobile"] as const;
export type WalletType = (typeof walletTypes)[number];
export const walletTypeEnum = pgEnum("wallet_type", walletTypes);

export const WalletTable = pgTable(
  "wallet",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text().notNull(),
    type: walletTypeEnum().notNull(),
    icon: text(),
    balance: numeric({ precision: 12, scale: 2 }).notNull().default("0"),
    currency: text().notNull().default("CNY"),
    isDefault: boolean().notNull().default(false),
    isSystem: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  table => [index("wallet_userId_idx").on(table.userId)],
);

export type WalletSelect = typeof WalletTable.$inferSelect;
export type WalletInsert = typeof WalletTable.$inferInsert;
