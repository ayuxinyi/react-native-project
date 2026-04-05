import CashoryBudgetPlanCard from "@/components/containers/home/cashory-budget-plan-card";
import CashoryCardBalance from "@/components/containers/home/cashory-card-balance";
import CashoryIncomeExpense from "@/components/containers/home/cashory-income-expense";
import Container from "@/components/ui/common/container";
import { GeneralAlarm } from "@/components/ui/icon/GeneralAlarm";
import { GeneralSearch } from "@/components/ui/icon/GeneralSearch";
import { useAuthSession } from "@/hooks/use-auth-session";
import useAuthTheme from "@/hooks/use-auth-theme";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";

const MONTH_ABBRS = [
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
];

const Home = () => {
  const { isDark } = useAuthTheme();
  const { data } = useAuthSession();
  const user = data?.data?.user;
  const userName = user?.name || "User";
  const userImage = user?.image;

  const iconColor = isDark ? "#ffffff" : "#000000";

  const currentMonthAbbr = MONTH_ABBRS[new Date().getMonth()];
  const [budgetMonth, setBudgetMonth] = useState(currentMonthAbbr);

  return (
    <Container className="p-4 md:p-6" isScrollable={false}>
      <ScrollView
        className="flex-1 w-full pt-2.5 pb-30"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mb-8 w-full pt-1">
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-2.5">
              {userImage ? (
                <Image
                  source={{ uri: userImage }}
                  className="size-12.5 rounded-[40px]"
                  resizeMode="cover"
                />
              ) : (
                <View className="size-12.5 rounded-[40px] bg-brand-green-500 items-center justify-center">
                  <Text className="text-[22px] text-brand-white font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View className="flex-col justify-center gap-y-1">
                <Text className="text-[14px] leading-3.5 text-foreground font-sans">
                  欢迎，
                </Text>
                <Text className="text-h4 leading-5 text-foreground font-bold">
                  {userName}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center gap-x-2.5">
            <Pressable className="size-12.5 rounded-[40px] bg-brand-flashwhite dark:bg-brand-green-800 items-center justify-center">
              <GeneralSearch width={23} height={23} color={iconColor} />
            </Pressable>
            <Link href="/notifications" asChild>
              <Pressable className="size-12.5 rounded-[40px] bg-brand-flashwhite dark:bg-brand-green-800 items-center justify-center">
                <GeneralAlarm width={23} height={23} color={iconColor} />
              </Pressable>
            </Link>
          </View>
        </View>
        <View className="flex-col w-full gap-y-2.5 mb-7">
          <CashoryCardBalance
            totalBalance={5000}
            earned={5000}
            spent={2000}
            available={3000}
            savings={5000 - 3000}
          />
          <Pressable
            className="w-full bg-brand-green-500 items-center justify-center p-4 min-h-14.25"
            style={{ borderRadius: 50 }}
          >
            <Text className="text-[16px] leading-4.75 text-brand-white font-bold">
              查看交易
            </Text>
          </Pressable>
        </View>
        <View className="flex-col w-full gap-y-2.5 mb-7">
          <CashoryIncomeExpense
            incomeAmount={15000}
            expenseAmount={6000}
            dateLabel="本月"
          />
          <CashoryBudgetPlanCard
            month="五月"
            onMonthChange={setBudgetMonth}
            availableCash={3000}
          />
        </View>
        <View className="flex-col w-full gap-y-2.5 mb-7">
          <View className="flex-row items-end justify-between w-full mb-1">
            <Text className="text-xl leading-6.25 text-foreground font-bold">
              发票列表
            </Text>
            <Link href="/invoices" asChild>
              <Text className="text-[14px] leading-3.75 text-foreground font-sans">
                查看发票
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
export default Home;
