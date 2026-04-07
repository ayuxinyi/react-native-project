import WalletTemplate from "@/components/templates/wallet-template";
import { queryWalletOptions } from "@/hooks/use-wallet";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "heroui-native";
import { Suspense } from "react";
import { View } from "react-native";
const Wallet = () => {
  const queryClient = useQueryClient();
  void queryClient.prefetchQuery(queryWalletOptions());

  return (
    <Suspense
      fallback={
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" color="success" />
        </View>
      }
    >
      <WalletTemplate />
    </Suspense>
  );
};
export default Wallet;
