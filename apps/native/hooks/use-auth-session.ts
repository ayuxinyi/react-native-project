import { authClient } from "@/lib/auth-client";
import { queryKeys } from "@/lib/query-keys";
import { signUpSchema } from "@react-native-project/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { output } from "zod";

export type SignUpValues = output<typeof signUpSchema>;
export type SignInValues = Omit<SignUpValues, "name">;

export const useAuthSession = () => {
  return useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: () => authClient.getSession(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAuthSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SignUpValues) => {
      const result = await authClient.signUp.email(input);
      if (result.error) {
        throw new Error(result.error.message || "账号注册失败，请稍后重试");
      }
      return result.data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error);
    },
  });
};

export const useAuthSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SignInValues) => {
      const result = await authClient.signIn.email(input);
      if (result.error) {
        throw new Error(result.error.message || "账号登录失败，请稍后重试");
      }
      return result.data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
  });
};
