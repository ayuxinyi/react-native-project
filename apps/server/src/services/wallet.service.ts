import { and, db, eq } from "@react-native-project/db";
import { WalletTable } from "@react-native-project/db/schema/wallet";
import type {
  CreateWalletInput,
  UpdateWalletInput,
} from "@react-native-project/schema";

export const listWallets = async (userId: string) => {
  return await db
    .select()
    .from(WalletTable)
    .where(eq(WalletTable.userId, userId));
};

export const getWalletById = async (userId: string, walletId: string) => {
  const [wallet] = await db
    .select()
    .from(WalletTable)
    .where(and(eq(WalletTable.userId, userId), eq(WalletTable.id, walletId)));
  return wallet ?? null;
};

export const getDefaultWallet = async (userId: string) => {
  const [wallet] = await db
    .select()
    .from(WalletTable)
    .where(
      and(eq(WalletTable.userId, userId), eq(WalletTable.isDefault, true)),
    );
  return wallet ?? null;
};

export const createWallet = async (
  userId: string,
  wallet: CreateWalletInput,
) => {
  // 如果是默认钱包，需要先将其他钱包的 isDefault 设为 false
  if (wallet.isDefault) {
    await db
      .update(WalletTable)
      .set({ isDefault: false })
      .where(eq(WalletTable.userId, userId));
  }

  const [created] = await db
    .insert(WalletTable)
    .values({
      ...wallet,
      currency: wallet.currency || "CNY",
      isDefault: wallet.isDefault || false,
      userId,
    })
    .returning();
  return created;
};

export const updateWallet = async (
  userId: string,
  walletId: string,
  wallet: UpdateWalletInput,
) => {
  if (wallet.isDefault) {
    await db
      .update(WalletTable)
      .set({ isDefault: false })
      .where(eq(WalletTable.userId, userId));
  }

  const [updated] = await db
    .update(WalletTable)
    .set({
      ...wallet,
      currency: wallet.currency || "CNY",
      isDefault: wallet.isDefault || false,
    })
    .where(and(eq(WalletTable.userId, userId), eq(WalletTable.id, walletId)))
    .returning();
  return updated;
};

export const deleteWallet = async (userId: string, walletId: string) => {
  const [deleted] = await db
    .delete(WalletTable)
    .where(and(eq(WalletTable.userId, userId), eq(WalletTable.id, walletId)))
    .returning();
  return deleted;
};
