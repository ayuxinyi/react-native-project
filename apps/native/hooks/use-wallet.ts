import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import {
  CreateWalletInput,
  UpdateWalletInput,
} from "@react-native-project/schema";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type WalletListResponse = InferResponseType<typeof api.api.wallet.$get>;
export type Wallet = NonNullable<WalletListResponse["data"]>[number];

export const queryWalletOptions = () =>
  queryOptions({
    queryKey: queryKeys.wallet.list(),
    queryFn: async () => {
      const res = await api.api.wallet.$get();
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "获取钱包列表失败");
      }
      return data.data || [];
    },
  });

export const queryWalletByIdOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.wallet.detail(id),
    queryFn: async () => {
      const res = await api.api.wallet.$get({ params: { id } });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "获取钱包详情失败");
      }
      return data.data || {};
    },
  });

export const queryWalletDefaultOptions = () =>
  queryOptions({
    queryKey: queryKeys.wallet.default(),
    queryFn: async () => {
      const res = await api.api.wallet.default.$get();
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "获取默认钱包失败");
      }
      return data.data || {};
    },
  });

export const useCreateWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (wallet: CreateWalletInput) => {
      const res = await api.api.wallet.$post({ json: wallet });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "创建钱包失败");
      }
      return data.data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.all,
      });
    },
  });
};

export const useUpdateWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      wallet,
    }: {
      id: string;
      wallet: UpdateWalletInput;
    }) => {
      const res = await api.api.wallet[":id"].$put({
        param: { id },
        json: wallet,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "更新钱包失败");
      }
      return data.data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.all,
      });
    },
  });
};

export const useDeleteWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.api.wallet[":id"].$delete({ param: { id } });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "删除钱包失败");
      }
      return data.data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.all,
      });
    },
  });
};
