import { api, ApiError } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@react-native-project/schema";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type CategoryListResponse = InferResponseType<
  typeof api.api.category.$get
>;
export type Category = NonNullable<CategoryListResponse["data"]>[number];

export const categoriesQueryOptions = (type?: "income" | "expense") =>
  queryOptions({
    queryKey: queryKeys.category.list(type),
    queryFn: async () => {
      const res = await api.api.category.$get({
        query: { type },
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new ApiError("分类列表获取失败", 0, "NETWORK_ERROR");
      return data.data ?? [];
    },
  });

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateCategoryInput) => {
      const res = await api.api.category.$post({ json: input });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "创建分类失败");
      }
      return data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.category.all });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: UpdateCategoryInput;
    }) => {
      const res = await api.api.category[":id"].$put({
        json: input,
        param: { id },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        let errMsg = "更新分类失败";
        throw new Error(data.error ?? errMsg);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.category.all });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.api.category[":id"].$delete({
        param: { id },
      });
      if (!res.ok) throw new Error("删除分类失败");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.category.all });
    },
  });
};
