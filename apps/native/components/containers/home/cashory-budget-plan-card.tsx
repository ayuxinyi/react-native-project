import { View } from "react-native";
import React from "react";
import { Card, cn, Select } from "heroui-native";
import { GeneralWallet } from "@/components/ui/icon/GeneralWallet";
import { GeneralChevronDo } from "@/components/ui/icon/GeneralChevronDo";

interface CashoryBudgetPlanCardProps {
  month: string;
  availableCash: string | number;
  months?: string[]; // 可选的月份数组，用于下拉选择
  onMonthChange?: (month: string) => void;
  className?: string; // 容器额外样式
}

export default function CashoryBudgetPlanCard({
  month,
  availableCash,
  months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  onMonthChange,
  className,
}: CashoryBudgetPlanCardProps) {
  return (
    <Card
      className={cn(
        "rounded-[30px] bg-brand-green-500 p-4 flex-row items-center justify-between border-0 w-full min-h-17.75",
        className,
      )}
      style={{
        borderCurve: "continuous",
        shadowColor: "rgba(139, 138, 138, 0.12)",
        shadowOffset: { width: -1, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 61,
        elevation: 10,
      }}
    >
      <View className="flex-row items-center gap-x-2.5 flex-1">
        <GeneralWallet color="#FFFFFF" width={24} height={24} />
        <View className="flex-col items-start h-10 gap-y-3.5 justify-center flex-1 pr-2">
          <Select
            value={{ value: month, label: `${month}预算` }}
            onValueChange={selected => {
              if (selected && onMonthChange) {
                // 单选模式返回 { value, label } 格式
                onMonthChange((selected as { value: string }).value);
              }
            }}
            presentation="bottom-sheet"
          >
            <Select.Trigger
              className="flex-row items-center gap-x-1 w-full bg-transparent border-0 p-0 m-0 h-auto min-h-0"
              style={{ paddingHorizontal: 0 }}
            >
              <Select.Value
                placeholder="选择月份"
                className="text-[16px] leading-5 text-brand-white"
                style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              />
              <Select.TriggerIndicator isAnimatedStyleActive={false}>
                <GeneralChevronDo color="#FFFFFF" width={20} height={20} />
              </Select.TriggerIndicator>
            </Select.Trigger>

            <Select.Portal>
              <Select.Overlay />
              <Select.Content presentation="bottom-sheet" className="pb-8">
                {months.map(m => (
                  <Select.Item key={m} value={m} label={`${m}预算`}>
                    <Select.ItemLabel className="text-brand-black dark:text-brand-white" />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Portal>
          </Select>

          <Card.Description
            className="text-body-xs leading-3.25 text-brand-white font-sans"
            numberOfLines={1}
          >
            可用余额
          </Card.Description>
        </View>
      </View>

      <Card.Title
        className="text-base leading-5 text-brand-white text-right font-bold"
        numberOfLines={1}
      >
        {typeof availableCash === "number"
          ? `¥${availableCash.toLocaleString()}`
          : availableCash}
      </Card.Title>
    </Card>
  );
}
