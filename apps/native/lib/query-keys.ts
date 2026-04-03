/**
 * 查询键
 * @description 用于查询的键值对
 */

export const queryKeys = {
  /**
   * 认证查询键
   * @description 用于查询认证相关的键值对
   */
  auth: {
    all: ["auth"] as const,
    session: ["auth", "session"] as const,
    user: (id: string) => ["auth", "user", id] as const,
  },
};
