import { View } from "react-native";
import React, { useState } from "react";
import CashoryNotificationItem from "@/components/base/profile/cashory-notification-item";

const NOTIFICATION_SETTINGS = [
  {
    id: "expense_alerts",
    title: "支出提醒",
    description: "记录新支出时即时通知",
  },
  {
    id: "budget_limit",
    title: "预算预警",
    description: "预算即将超限时提醒",
  },
  {
    id: "income_received",
    title: "收入到账",
    description: "新收入入账时即时通知",
  },
  {
    id: "bill_reminder",
    title: "账单提醒",
    description: "定期账单到期前提前提醒，不再错过还款日",
  },
  {
    id: "goal_update",
    title: "目标进度",
    description: "追踪储蓄进度与财务目标完成情况",
  },
  {
    id: "high_spending",
    title: "异常消费",
    description: "消费金额高于日常水平时提醒",
  },
  {
    id: "finance_tips",
    title: "理财建议",
    description: "获取个性化理财技巧与智能消费建议",
  },
];

export default function NotificationSettingsView() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(
    () =>
      NOTIFICATION_SETTINGS.reduce(
        (acc, item) => ({ ...acc, [item.id]: false }),
        {} as Record<string, boolean>,
      ),
  );

  const handleToggle = (id: string) => (value: boolean) => {
    setToggleStates(prev => ({ ...prev, [id]: value }));
  };

  return (
    <View className="flex-col gap-y-2.5">
      {NOTIFICATION_SETTINGS.map(item => (
        <CashoryNotificationItem
          key={item.id}
          title={item.title}
          description={item.description}
          isSelected={toggleStates[item.id] ?? false}
          onValueChange={handleToggle(item.id)}
        />
      ))}
    </View>
  );
}
