import { authMiddleware } from "@/middlewares/auth.middleware";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createCategorySchema,
  idParamSchema,
  listCategorySchema,
  updateCategorySchema,
} from "@react-native-project/schema";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "@/services/category.service";
import type { CategorySelect } from "@react-native-project/db/schema";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const categoryRoutes = new Hono()
  .use(authMiddleware)
  .get("/", zValidator("query", listCategorySchema), async c => {
    const userId = c.get("userId");
    const { type } = c.req.valid("query");
    const data = await listCategories(userId, type);
    return c.json<ApiResponse<CategorySelect[]>>({ success: true, data });
  })
  .post("/", zValidator("json", createCategorySchema), async c => {
    const userId = c.get("userId");
    const input = c.req.valid("json");
    const data = await createCategory(userId, input);
    if (!data) {
      return c.json<ApiResponse<CategorySelect>>(
        {
          success: false,
          error: "由于未知错误，创建类别失败",
        },
        500,
      );
    }
    return c.json<ApiResponse<CategorySelect>>({ success: true, data });
  })
  .put(
    "/:id",
    zValidator("param", idParamSchema),
    zValidator("json", updateCategorySchema),
    async c => {
      const userId = c.get("userId");
      const { id } = c.req.param();
      const input = c.req.valid("json");
      const data = await updateCategory(userId, id, input);
      if (!data) {
        return c.json<ApiResponse<CategorySelect>>(
          {
            success: false,
            error: "类别不存在或者类别为系统类别，不能更新",
          },
          404,
        );
      }
      return c.json<ApiResponse<CategorySelect>>({ success: true, data });
    },
  )
  .delete("/:id", zValidator("param", idParamSchema), async c => {
    const userId = c.get("userId");
    const { id } = c.req.param();
    const data = await deleteCategory(userId, id);
    if (!data) {
      return c.json<ApiResponse<CategorySelect>>(
        {
          success: false,
          error: "类别不存在或者类别为系统类别，不能删除",
        },
        404,
      );
    }
    return c.json<ApiResponse<CategorySelect>>({ success: true });
  });
