import CashorySectionHeader from "@/components/ui/common/cashory-section-header";
import { View, Text } from "react-native";
import CashoryIncomeExpense from "../home/cashory-income-expense";
import CashoryReportBalanceChart from "@/components/base/reports/cashory-report-balance-chart";

const OVERVIEW_CHART_DATA = [
  { label: "一月", value: 5200 },
  { label: "二月", value: 7400 },
  { label: "三月", value: 9600 },
  { label: "四月", value: 11900 },
  { label: "五月", value: 18300 },
  { label: "六月", value: 15000 },
  { label: "七月", value: 21000 },
];

const DashboardOverview = () => {
  return (
    <View className="flex-col gap-y-5">
      <CashorySectionHeader
        title="控制中心"
        rightTitle="查看全部"
        rightTitleClassName="text-foreground text-[12px] font-medium"
        onRightPress={() => {}}
      />
      <View className="self-start bg-brand-green-500 dark:bg-brand-green-800 rounded-[20px] px-3 py-1.5 -mt-2">
        <Text className="text-body-xs text-brand-white font-bold">
          本月数据
        </Text>
      </View>

      <CashoryIncomeExpense
        incomeAmount={15000}
        expenseAmount={6000}
        dateLabel="本月"
      />
      <CashoryReportBalanceChart
        balance={15000}
        changeLabel="+5%"
        periodLabel="本月"
        chartData={OVERVIEW_CHART_DATA}
      />
    </View>
  );
};
export default DashboardOverview;
