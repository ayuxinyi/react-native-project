import { View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Card, cn } from "heroui-native";
import useAuthTheme from "@/hooks/use-auth-theme";
import { GeneralArrowUpLe } from "@/components/ui/icon/GeneralArrowUpLe";
import { GeneralArrowUpRi } from "@/components/ui/icon/GeneralArrowUpRi";

interface CashoryIncomeExpenseProps {
  incomeAmount: number;
  expenseAmount: number;
  dateLabel?: string;
  className?: string;
}

export default function CashoryIncomeExpense({
  incomeAmount,
  expenseAmount,
  dateLabel = "本月",
  className = "",
}: CashoryIncomeExpenseProps) {
  const { isDark } = useAuthTheme();

  // 浅色模式自定义阴影（来自 Figma）：-1px -5px 61px 0px #8b8a8a1f (rgba(139,138,138,0.12))
  const shadowStyle: StyleProp<ViewStyle> = !isDark
    ? {
        shadowColor: "rgba(139, 138, 138, 0.12)",
        shadowOffset: { width: -1, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 61,
        elevation: 10, // Android 近似阴影高度
      }
    : {};

  return (
    <View
      className={cn(
        "flex-row items-center justify-between w-full gap-x-2.5",
        className,
      )}
    >
      {/* 收入卡片 */}
      <Card
        className="flex-1 flex-row items-center bg-brand-white dark:bg-brand-green-500 rounded-[30px] p-[13px_16px] gap-x-3 border-0"
        style={[{ borderCurve: "continuous" }, shadowStyle]}
      >
        <View style={{ transform: [{ rotate: "180deg" }] }}>
          <GeneralArrowUpLe
            color={isDark ? "#FFFFFF" : "#1C3E38"}
            width={24}
            height={24}
          />
        </View>
        <Card.Body className="flex-col items-start gap-y-3.5 flex-1 p-0">
          <View className="flex-col items-start w-full">
            <Card.Title
              className="text-body-sm leading-4.25 text-brand-black dark:text-brand-white"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              收入
            </Card.Title>
            <Card.Title
              className="text-[16px] leading-5 text-brand-black dark:text-brand-white"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              numberOfLines={1}
            >
              {typeof incomeAmount === "number"
                ? `¥${incomeAmount.toLocaleString()}`
                : incomeAmount}
            </Card.Title>
          </View>
          <Card.Description
            className="text-body-xs leading-3.25 text-brand-black dark:text-brand-white"
            style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            numberOfLines={1}
          >
            {dateLabel}
          </Card.Description>
        </Card.Body>
      </Card>

      {/* 支出卡片 */}
      <Card
        className="flex-1 flex-row items-center bg-brand-white dark:bg-brand-green-500 rounded-[30px] p-[13px_16px] gap-x-3 border-0"
        style={[{ borderCurve: "continuous" }, shadowStyle]}
      >
        <View style={{ transform: [{ rotate: "180deg" }] }}>
          <GeneralArrowUpRi
            color={isDark ? "#FF4B51" : "#E9383E"}
            width={24}
            height={24}
          />
        </View>
        <Card.Body className="flex-col items-start gap-y-3.5 flex-1 p-0">
          <View className="flex-col items-start w-full">
            <Card.Title
              className="text-body-sm leading-4.25 text-brand-black dark:text-brand-white"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              支出
            </Card.Title>
            <Card.Title
              className="text-[16px] leading-5 text-brand-black dark:text-brand-white"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              numberOfLines={1}
            >
              {typeof expenseAmount === "number"
                ? `¥${expenseAmount.toLocaleString()}`
                : expenseAmount}
            </Card.Title>
          </View>
          <Card.Description
            className="text-body-xs leading-3.25 text-brand-black dark:text-brand-white"
            style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            numberOfLines={1}
          >
            {dateLabel}
          </Card.Description>
        </Card.Body>
      </Card>
    </View>
  );
}
