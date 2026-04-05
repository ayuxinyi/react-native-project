import { View, Text } from "react-native";
import React from "react";
import CashoryReportSummaryCard from "@/components/base/reports/cashory-report-summary-card";
import PeriodBadge from "@/components/base/reports/period-badge";
import CashoryReportBarChart from "@/components/base/reports/cashory-report-bar-chart";
import CashorySectionHeader from "@/components/ui/common/cashory-section-header";
import CashoryTransactionCard from "@/components/base/reports/cashory-transaction-card";

const EXPENSE_CHART_DATA = [
  { label: "1月", value: 900 },
  { label: "2月", value: 1200 },
  { label: "3月", value: 1300 },
  { label: "4月", value: 800 },
  { label: "5月", value: 600 },
  { label: "6月", value: 700 },
  { label: "7月", value: 500 },
];

const EXPENSE_HISTORY = [
  { title: "房租", datetime: "27 Jul, 17:22 pm", amount: 350.0 },
  { title: "购物", datetime: "22 Jun, 09:30 am", amount: 120.4 },
];

export default function ExpenseActivity() {
  return (
    <View className="flex-col gap-y-5">
      {/* All Time / Monthly Summary */}
      <CashoryReportSummaryCard
        leftTitle="总支出金额"
        leftValue={16467.56}
        rightTitle="月支出金额"
        rightValue={500.5}
        type="expense"
      />

      {/* Overview section */}
      <View className="flex-col gap-y-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-h4 leading-6.25 text-brand-black dark:text-brand-white font-bold">
            支出趋势
          </Text>
          <PeriodBadge label="最近6个月" />
        </View>

        <CashoryReportBarChart
          data={EXPENSE_CHART_DATA}
          variant="expense"
          maxBarHeight={160}
        />
      </View>

      {/* Expense History */}
      <View className="flex-col gap-y-2.5">
        <CashorySectionHeader
          title="支出记录"
          rightTitle="查看更多"
          rightTitleClassName="text-brand-black dark:text-brand-white text-[12px] font-medium"
          onRightPress={() => {}}
        />
        {EXPENSE_HISTORY.map((item, index) => (
          <CashoryTransactionCard
            key={`expense-${index}`}
            title={item.title}
            datetime={item.datetime}
            amount={item.amount}
            type="expense"
          />
        ))}
      </View>
    </View>
  );
}
