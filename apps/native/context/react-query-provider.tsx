import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { FC, PropsWithChildren, useEffect, useState } from "react";
// 社区库，用于监听网络状态
import NetInfo from "@react-native-community/netinfo";

// 网络监听器
const NetworkListener = () => {
  useEffect(() => {
    return NetInfo.addEventListener(state => {
      // 设置网络状态
      onlineManager.setOnline(
        !!state.isConnected && !!state.isInternetReachable,
      );
    });
  }, []);
  return null;
};

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 缓存5分钟
            staleTime: 1000 * 60 * 5,
            // 重试2次
            retry(failureCount, error) {
              // 网络错误不重试
              if (
                error instanceof Error &&
                error.message.includes("Network request failed")
              ) {
                return false;
              }
              // 其他错误重试2次
              return failureCount < 2;
            },
            // 不在窗口聚焦时重试
            refetchOnWindowFocus: true,
            // 重新连接时重试
            refetchOnReconnect: true,
          },
          // 重试1次
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <NetworkListener />
        {children}
      </>
    </QueryClientProvider>
  );
};
