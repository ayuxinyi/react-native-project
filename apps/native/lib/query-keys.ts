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
    session: () => ["auth", "session"] as const,
    user: (id: string) => ["auth", "user", id] as const,
  },
  /**
   * 用户查询键
   * @description 用于查询用户相关的键值对
   */
  user: {
    all: ["user"] as const,
    profile: () => ["user", "profile"] as const,
    onboarding: () => ["user", "onboarding"] as const,
  },
  /**
   * 分类查询键
   * @description 用于查询分类相关的键值对
   */
  category: {
    all: ["category"] as const,
    list: (type?: "income" | "expense") => ["category", "list", type] as const,
  },
  /**
   * 钱包查询键
   * @description 用于查询钱包相关的键值对
   */
  wallet: {
    all: ["wallet"] as const,
    list: () => ["wallet", "list"] as const,
    detail: (id: string) => ["wallet", "detail", id] as const,
    default: () => ["wallet", "default"] as const,
  },
};
