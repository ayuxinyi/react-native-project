import CashoryReportBarChart from "@/components/base/reports/cashory-report-bar-chart";
import CashoryReportSummaryCard from "@/components/base/reports/cashory-report-summary-card";
import CashoryTransactionCard from "@/components/base/reports/cashory-transaction-card";
import PeriodBadge from "@/components/base/reports/period-badge";
import CashorySectionHeader from "@/components/base/reports/cashory-section-header";
import { Text, View } from "react-native";

const INCOME_CHART_DATA = [
  { label: "1月", value: 3600 },
  { label: "2月", value: 3600 },
  { label: "3月", value: 5700 },
  { label: "4月", value: 9900 },
  { label: "5月", value: 5700 },
  { label: "6月", value: 4200 },
  { label: "7月", value: 7800 },
];

const INCOME_HISTORY = [
  { title: "收入", datetime: "31 Jul, 08:30 am", amount: 500.0 },
  { title: "自由职业支付", datetime: "28 Jun, 08:00 am", amount: 750.0 },
];

const IncomeActivity = () => {
  return (
    <View className="flex-col gap-y-5">
      <CashoryReportSummaryCard
        leftTitle="总收入"
        leftValue={54000.9}
        rightTitle="月收入"
        rightValue={4000.9}
        type="income"
      />

      <View className="flex-col gap-y-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-h4 leading-6.25 text-brand-black dark:text-brand-white">
            数据总览
          </Text>
          <PeriodBadge label="六月数据" />
        </View>

        <CashoryReportBarChart
          data={INCOME_CHART_DATA}
          variant="income"
          maxBarHeight={160}
        />
      </View>
      <View className="flex-col gap-y-2.5 w-full">
        <CashorySectionHeader
          title="收入记录"
          rightTitle="排序"
          rightTitleClassName="text-brand-black dark:text-brand-white text-[12px] font-medium"
          onRightPress={() => {}}
        />
        {INCOME_HISTORY.map((item, index) => (
          <CashoryTransactionCard
            key={`income-${index}`}
            title={item.title}
            datetime={item.datetime}
            amount={item.amount}
            type="income"
          />
        ))}
      </View>
    </View>
  );
};
export default IncomeActivity;
