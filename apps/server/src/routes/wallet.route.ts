import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  createWallet,
  deleteWallet,
  getDefaultWallet,
  getWalletById,
  listWallets,
  updateWallet,
} from "@/services/wallet.service";
import { zValidator } from "@hono/zod-validator";
import type { WalletSelect } from "@react-native-project/db/schema";
import {
  createWalletSchema,
  idParamSchema,
  updateWalletSchema,
} from "@react-native-project/schema";
import { Hono } from "hono";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const walletRoutes = new Hono()
  .use(authMiddleware)
  .get("/", async c => {
    const userId = c.get("userId");
    const data = await listWallets(userId);
    return c.json<ApiResponse<WalletSelect[]>>({ success: true, data });
  })
  .get("/:id", zValidator("param", idParamSchema), async c => {
    const userId = c.get("userId");
    const { id } = c.req.valid("param");
    const data = await getWalletById(userId, id);
    if (!data) {
      return c.json<ApiResponse<WalletSelect>>({
        success: false,
        error: "钱包不存在",
      });
    }
    return c.json<ApiResponse<WalletSelect>>({ success: true, data });
  })
  .get("/default", async c => {
    const userId = c.get("userId");
    const data = await getDefaultWallet(userId);
    if (!data) {
      return c.json<ApiResponse<WalletSelect>>({
        success: false,
        error: "默认钱包不存在",
      });
    }
    return c.json<ApiResponse<WalletSelect>>({ success: true, data });
  })
  .post("/", zValidator("json", createWalletSchema), async c => {
    const userId = c.get("userId");
    const body = c.req.valid("json");
    const created = await createWallet(userId, body);
    if (!created) {
      return c.json<ApiResponse<WalletSelect>>({
        success: false,
        error: "创建钱包失败",
      });
    }
    return c.json<ApiResponse<WalletSelect>>({ success: true, data: created });
  })
  .put(
    "/:id",
    zValidator("param", idParamSchema),
    zValidator("json", updateWalletSchema),
    async c => {
      const userId = c.get("userId");
      const { id } = c.req.valid("param");
      const body = c.req.valid("json");
      const updated = await updateWallet(userId, id, body);
      if (!updated) {
        return c.json<ApiResponse<WalletSelect>>({
          success: false,
          error: "更新钱包失败",
        });
      }
      return c.json<ApiResponse<WalletSelect>>({
        success: true,
        data: updated,
      });
    },
  )
  .delete("/:id", zValidator("param", idParamSchema), async c => {
    const userId = c.get("userId");
    const { id } = c.req.valid("param");
    const deleted = await deleteWallet(userId, id);
    if (!deleted) {
      return c.json<ApiResponse<WalletSelect>>({
        success: false,
        error: "删除钱包失败",
      });
    }
    return c.json<ApiResponse<WalletSelect>>({ success: true, data: deleted });
  });
