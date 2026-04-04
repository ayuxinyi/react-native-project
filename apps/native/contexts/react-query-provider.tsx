import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AppState, Platform, type AppStateStatus } from "react-native";

/**
 * 与 TanStack Query 官方 React Native 指南一致：
 * https://tanstack.com/query/latest/docs/framework/react/react-native
 *
 * 使用 NetInfo 驱动 onlineManager；仅用 isConnected，避免 isInternetReachable
 * 在真机/Expo 上误报导致 mutation/query 长期 paused。
 * setEventListener 在模块加载时注册一次即可，无需挂在 React 树里反复订阅。
 */
onlineManager.setEventListener(setOnline => {
  void NetInfo.fetch().then(state => {
    setOnline(!!state.isConnected);
  });

  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

/** 前台/后台与 Web 的 window focus 对齐，便于 refetchOnWindowFocus 等行为在 RN 上合理工作 */
function FocusManagerSync() {
  useEffect(() => {
    const onChange = (status: AppStateStatus) => {
      if (Platform.OS !== "web") {
        focusManager.setFocused(status === "active");
      }
    };

    onChange(AppState.currentState as AppStateStatus);
    const sub = AppState.addEventListener("change", onChange);
    return () => sub.remove();
  }, []);

  return null;
}

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry(failureCount, error) {
              if (
                error instanceof Error &&
                error.message.includes("Network request failed")
              ) {
                return false;
              }
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FocusManagerSync />
      {children}
    </QueryClientProvider>
  );
};
