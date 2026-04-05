import CashoryAddTransactionModal from "@/components/containers/transactions/cashory-add-transaction-modal";
import { GeneralEdit } from "@/components/ui/icon/GeneralEdit";
import useAuthTheme from "@/hooks/use-auth-theme";
import { BlurTargetView } from "expo-blur";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useThemeColor } from "heroui-native";
import { useState } from "react";
import { View, Pressable } from "react-native";

const TabsLayout = () => {
  const { isDark } = useAuthTheme();
  const themeColorBackground = useThemeColor("background");
  const [isAddTransactionVisible, setIsAddTransactionVisible] = useState(false);

  return (
    <>
      <BlurTargetView
        style={{ flex: 1, backgroundColor: themeColorBackground }}
      >
        {/* 使用原生标签组件，自定义图标和标签样式 */}
        <NativeTabs
          iconColor={{
            default: isDark ? "#A3A3A3" : "#16302B",
            selected: isDark ? "#FFFFFF" : "#16302B",
          }}
          labelStyle={{
            default: {
              color: isDark ? "#A3A3A3" : "#16302B",
              fontWeight: "600",
            },
            selected: {
              color: isDark ? "#FFFFFF" : "#16302B",
              fontWeight: "600",
            },
          }}
          blurEffect="systemMaterialDark"
        >
          <NativeTabs.Trigger name="index">
            <NativeTabs.Trigger.Icon
              sf={{ default: "house", selected: "house.fill" }}
              md="home"
            />
            <NativeTabs.Trigger.Label>首页</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="transactions">
            <NativeTabs.Trigger.Icon
              sf={{ default: "newspaper", selected: "newspaper.fill" }}
              md="article"
            />
            <NativeTabs.Trigger.Label>交易中心</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="reports">
            <NativeTabs.Trigger.Icon
              sf={{ default: "chart.pie", selected: "chart.pie.fill" }}
              md="pie_chart"
            />
            <NativeTabs.Trigger.Label>数据中心</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="profile">
            <NativeTabs.Trigger.Icon
              sf={{ default: "person", selected: "person.fill" }}
              md="person"
            />
            <NativeTabs.Trigger.Label>个人中心</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        </NativeTabs>
        <View
          className="absolute right-6 bottom-32 size-15"
          pointerEvents="box-none"
        >
          <Pressable
            className="flex-1 rounded-[40px] bg-[#16302B] items-center justify-center p-3.25 border-2 border-transparent dark:border-[#3b82f615]"
            style={{
              shadowColor: "rgba(0,0,0,0.5)",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 15,
              elevation: 16,
            }}
            onPress={() => setIsAddTransactionVisible(true)}
          >
            <GeneralEdit color="#FFFFFF" width={22} height={22} />
          </Pressable>
        </View>
      </BlurTargetView>
      <CashoryAddTransactionModal
        visible={isAddTransactionVisible}
        onClose={() => setIsAddTransactionVisible(false)}
        onConfirm={() => setIsAddTransactionVisible(false)}
      />
    </>
  );
};
export default TabsLayout;
