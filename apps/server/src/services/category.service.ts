/**
 * @file 类别相关服务
 */

import {
  CategoryTable,
  type CategoryType,
} from "@react-native-project/db/schema/category";
import { and, asc, db, eq, isNull, or } from "@react-native-project/db";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@react-native-project/schema";

/**
 * @description 获取用户下的所有类别
 * @param userId 用户ID
 * @param type 类别类型
 * @returns 类别列表
 */
export const listCategories = async (userId: string, type?: CategoryType) => {
  const condition = [
    or(eq(CategoryTable.userId, userId), isNull(CategoryTable.userId)),
  ];
  if (type) {
    condition.push(eq(CategoryTable.type, type));
  }
  return db
    .select()
    .from(CategoryTable)
    .where(and(...condition))
    .orderBy(asc(CategoryTable.sortOrder));
};

/**
 * @description 创建类别
 * @param userId 用户ID
 * @param input 创建类别输入参数
 * @returns 创建的类别
 */
export const createCategory = async (
  userId: string,
  input: CreateCategoryInput,
) => {
  const [created] = await db
    .insert(CategoryTable)
    .values({
      ...input,
      sortOrder: input.sortOrder ?? 0,
      isSystem: false,
      userId,
    })
    .returning();

  return created;
};

/**
 * @description 更新类别
 * @param userId 用户ID
 * @param categoryId 类别ID
 * @param input 更新类别输入参数
 * @returns 更新后的类别
 */
export const updateCategory = async (
  userId: string,
  categoryId: string,
  input: UpdateCategoryInput,
) => {
  const [updated] = await db
    .update(CategoryTable)
    .set(input)
    .where(
      and(
        eq(CategoryTable.userId, userId),
        eq(CategoryTable.id, categoryId),
        eq(CategoryTable.isSystem, false),
      ),
    )
    .returning();

  return updated;
};

/**
 * @description 删除类别
 * @param userId 用户ID
 * @param categoryId 类别ID
 * @returns 删除的类别
 */
export const deleteCategory = async (userId: string, categoryId: string) => {
  const [deleted] = await db
    .delete(CategoryTable)
    .where(
      and(
        eq(CategoryTable.userId, userId),
        eq(CategoryTable.id, categoryId),
        eq(CategoryTable.isSystem, false),
      ),
    )
    .returning();

  return deleted;
};
