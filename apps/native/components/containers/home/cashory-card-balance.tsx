import { View } from "react-native";
import React from "react";
import { Card, cn } from "heroui-native";
import useAuthTheme from "@/hooks/use-auth-theme";
import { CardOrnament } from "../../ui/icon/card-ornament";
import { GeneralArrowUpRi } from "../../ui/icon/GeneralArrowUpRi";

interface CashoryCardBalanceProps {
  totalBalance: number;
  earned: number;
  spent: number;
  available: number;
  savings: number;
  className?: string;
}

export default function CashoryCardBalance({
  totalBalance,
  earned,
  spent,
  available,
  savings,
  className = "",
}: CashoryCardBalanceProps) {
  const { isDark } = useAuthTheme();
  return (
    <Card
      className={cn(
        "relative rounded-[30px] bg-brand-green-500 w-full min-h-39.25 p-5 overflow-hidden border-0",
        className,
      )}
      style={{ borderCurve: "continuous" }}
    >
      <View className="absolute -top-1 -right-4">
        <CardOrnament
          color={isDark ? "#0F2723" : "#FFFFFF"}
          width={223}
          height={125}
        />
      </View>

      <Card.Body className="flex-col w-full h-full justify-between gap-y-6 flex-1 p-0">
        <View className="flex-row items-start justify-between w-full">
          <View className="flex-col items-start gap-y-1">
            <Card.Description className="text-brand-white text-base leading-5 font-sans">
              总金额
            </Card.Description>
            <Card.Title className="text-brand-white! dark:text-brand-white text-h2 leading-8.75 font-bold">
              {typeof totalBalance === "number"
                ? `¥${totalBalance.toLocaleString()}`
                : totalBalance}
            </Card.Title>
          </View>
          <GeneralArrowUpRi color="#FFFFFF" width={24} height={24} />
        </View>

        <View className="flex-row items-center justify-between w-full">
          {/* Earned */}
          <View className="flex-row items-center gap-x-1.5">
            <View className="w-2.5 h-2.5 rounded-full bg-brand-green-50" />
            <View className="flex-col items-start gap-y-0.5">
              <Card.Title className="text-brand-white! text-body-sm leading-3.75 font-bold">
                已赚金额
              </Card.Title>
              <Card.Description className="text-brand-white! text-body-sm leading-3.75 font-sans">
                {typeof earned === "number"
                  ? `¥${earned.toLocaleString()}`
                  : earned}
              </Card.Description>
            </View>
          </View>

          {/* Spent */}
          <View className="flex-row items-center gap-x-1.5">
            <View className="w-2.5 h-2.5 rounded-full bg-brand-white" />
            <View className="flex-col items-start gap-y-0.5">
              <Card.Title className="text-brand-white! text-body-sm leading-3.75 font-bold">
                已花金额
              </Card.Title>
              <Card.Description className="text-brand-white! text-body-sm leading-3.75 font-sans">
                {typeof spent === "number"
                  ? `¥${spent.toLocaleString()}`
                  : spent}
              </Card.Description>
            </View>
          </View>

          {/* Available */}
          <View className="flex-row items-center gap-x-1.5">
            <View className="w-2.5 h-2.5 rounded-full bg-brand-white" />
            <View className="flex-col items-start gap-y-0.5">
              <Card.Title className="text-brand-white! text-body-sm leading-3.75 font-bold">
                可用金额
              </Card.Title>
              <Card.Description className="text-brand-white! text-body-sm leading-3.75 font-sans">
                {typeof available === "number"
                  ? `¥${available.toLocaleString()}`
                  : available}
              </Card.Description>
            </View>
          </View>

          {/* Savings */}
          <View className="flex-row items-center gap-x-1.5">
            <View className="w-2.5 h-2.5 rounded-full bg-brand-white" />
            <View className="flex-col items-start gap-y-0.5">
              <Card.Title className="text-brand-white! text-body-sm leading-3.75 font-bold">
                保存金额
              </Card.Title>
              <Card.Description className="text-brand-white! text-body-sm leading-3.75 font-sans">
                {typeof savings === "number"
                  ? `¥${savings.toLocaleString()}`
                  : savings}
              </Card.Description>
            </View>
          </View>
        </View>
      </Card.Body>
    </Card>
  );
}
