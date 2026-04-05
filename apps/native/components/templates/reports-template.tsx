import { View, Text, ScrollView, Pressable } from "react-native";
import CashoryScreenHeader from "../base/reports/cashory-screen-header";
import { useCallback, useState } from "react";
import { StyledGeneralOption } from "../ui/icon/GeneralOption";
import { cn, useThemeColor } from "heroui-native";
import Container from "../ui/common/container";
import DashboardOverview from "../containers/reports/dashboard-overview";
import IncomeActivity from "../containers/reports/income-activity";
import ExpenseActivity from "../containers/reports/expense-activity";

type ReportTab = "overview" | "income" | "expense";

const tabs: { key: ReportTab; title: string }[] = [
  { key: "overview", title: "数据总览" },
  { key: "income", title: "收入数据" },
  { key: "expense", title: "支出数据" },
];

const ReportsTemplate = () => {
  const iconColor = useThemeColor("foreground");

  const [activeTab, setActiveTab] = useState<ReportTab>("overview");
  const getTitle = useCallback(() => {
    switch (activeTab) {
      case "overview":
        return "数据总览";
      case "income":
        return "收入数据";
      case "expense":
        return "支出数据";
    }
  }, [activeTab]);

  return (
    <Container className="p-4" isScrollable={false}>
      <ScrollView
        className="flex-1 w-full pt-2.5 pb-30"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 w-full">
          <CashoryScreenHeader
            title={getTitle()}
            showBack={false}
            className="pt-0"
            rightElement={
              activeTab !== "overview" ? (
                <Pressable
                  hitSlop={8}
                  className="size-12 rounded-[40px] items-center justify-center bg-brand-flashwhite dark:bg-brand-green-800"
                >
                  <StyledGeneralOption
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                </Pressable>
              ) : undefined
            }
          />
        </View>
        <View className="flex-row items-center bg-brand-flashwhite dark:bg-brand-green-800 rounded-[30px] p-1 mb-6 w-full">
          {tabs.map(tab => {
            const isActive = tab.key === activeTab;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={cn(
                  "flex-1 items-center justify-center py-3 rounded-[30px] transition-all duration-300",
                  isActive ? "bg-brand-green-500" : "bg-transparent",
                )}
              >
                <Text
                  className={cn(
                    "text-body-sm",
                    isActive
                      ? "text-brand-white font-bold"
                      : "text-foreground font-sans",
                  )}
                >
                  {tab.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {activeTab === "overview" && <DashboardOverview />}
        {activeTab === "income" && <IncomeActivity />}
        {activeTab === "expense" && <ExpenseActivity />}
      </ScrollView>
    </Container>
  );
};
export default ReportsTemplate;
