import { View, StyleProp, ViewStyle, Pressable } from "react-native";
import React from "react";
import useAuthTheme from "@/hooks/use-auth-theme";
import { Card, Chip } from "heroui-native";
import { GeneralWallet } from "@/components/ui/icon/GeneralWallet";

export type InvoiceStatus = "已付款" | "待付款" | "逾期" | "已取消";

interface CashoryInvoiceCardProps {
  title: string;
  datetime: string;
  amount: string | number;
  status: InvoiceStatus;
  icon?: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export default function CashoryInvoiceCard({
  title,
  datetime,
  amount,
  status,
  icon,
  onPress,
  className = "",
}: CashoryInvoiceCardProps) {
  const { isDark } = useAuthTheme();

  const fallbackIconColor = isDark ? "#FFFFFF" : "#000000";

  // 浅色模式阴影样式
  const shadowStyle: StyleProp<ViewStyle> = !isDark
    ? {
        shadowColor: "rgba(139, 138, 138, 0.12)",
        shadowOffset: { width: -1, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 61,
        elevation: 10,
      }
    : {};

  // 状态标签样式
  let statusBg = "";
  let statusText = "text-brand-white";
  switch (status) {
    case "已付款":
      statusBg = "bg-brand-green-500 dark:bg-[#0F2723]";
      break;
    case "待付款":
      statusBg = "bg-brand-flashwhite";
      statusText = "text-brand-black dark:text-[#0F2723]";
      break;
    case "逾期":
    case "已取消":
      statusBg = "bg-brand-red-500";
      break;
  }

  // 状态对应的 Chip 颜色
  const chipColor =
    status === "已付款"
      ? "success"
      : status === "待付款"
        ? "warning"
        : "danger";

  return (
    <Pressable onPress={onPress} className="w-full">
      <Card
        className={`rounded-[30px] bg-brand-white dark:bg-brand-green-500 p-4 flex-row items-center justify-between border-0 w-full min-h-20.5 ${className}`}
        style={[{ borderCurve: "continuous" }, shadowStyle]}
      >
        <View className="flex-row items-center gap-x-3.5 flex-1 pr-2">
          {/* 左侧图标圆形容器 */}
          <View className="w-12.5 h-12.5 rounded-[40px] items-center justify-center bg-brand-flashwhite dark:bg-brand-green-800">
            {icon ? (
              icon
            ) : (
              <GeneralWallet color={fallbackIconColor} width={23} height={23} />
            )}
          </View>

          <View className="flex-col items-start h-11.5 justify-between flex-1 overflow-hidden">
            <Card.Title
              className="text-[16px] leading-5 text-brand-black dark:text-brand-white"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              numberOfLines={1}
            >
              {title}
            </Card.Title>
            <Card.Description
              className="text-body-xs leading-3.75 text-brand-black dark:text-brand-white"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
              numberOfLines={1}
            >
              {datetime}
            </Card.Description>
          </View>
        </View>

        <View className="flex-col items-end h-12.5 justify-between">
          <Card.Title
            className="text-[16px] leading-5 text-brand-black dark:text-brand-white text-right"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            numberOfLines={1}
          >
            {typeof amount === "number"
              ? `¥${amount.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : amount}
          </Card.Title>

          <Chip
            size="sm"
            variant="primary"
            color={chipColor}
            className="min-w-15 items-center justify-center"
          >
            <Chip.Label className="text-body-sm leading-3.75 text-brand-white font-bold">
              {status}
            </Chip.Label>
          </Chip>
        </View>
      </Card>
    </Pressable>
  );
}
