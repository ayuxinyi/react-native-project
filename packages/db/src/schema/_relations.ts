/**
 * @file 关系定义
 * @description 定义数据库表之间的关系
 */

import { relations } from "drizzle-orm";
import { account, session, user } from "./auth";
import { CategoryTable } from "./category";
import { WalletTable } from "./wallet";

/**
 * @description 用户与会话的关系
 */

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  categories: many(CategoryTable),
  wallets: many(WalletTable),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

/**
 * @description 分类与用户的关系
 */
export const categoryRelations = relations(CategoryTable, ({ one }) => ({
  user: one(user, {
    fields: [CategoryTable.userId],
    references: [user.id],
  }),
}));

/**
 * @description 钱包与用户的关系
 */
export const walletRelations = relations(WalletTable, ({ one }) => ({
  user: one(user, {
    fields: [WalletTable.userId],
    references: [user.id],
  }),
}));
