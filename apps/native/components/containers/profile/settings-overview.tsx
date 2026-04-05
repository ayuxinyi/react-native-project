import { useAuthSession, useAuthSignOut } from "@/hooks/use-auth-session";
import { SettingsView } from "@/types/profile";
import { useRouter } from "expo-router";
import { FC } from "react";
import { View, Text } from "react-native";
import CashoryProfileCard from "./cashory-profile-card";
import SettingsLabel from "@/components/base/profile/settings-label";
import CashorySettingsMenuItem from "@/components/base/profile/cashory-settings-menu-item";
import { User } from "@/components/ui/icon/User";
import { GeneralNotificat } from "@/components/ui/icon/GeneralNotificat";
import { GeneralSliders } from "@/components/ui/icon/GeneralSliders";
import { GeneralExplore } from "@/components/ui/icon/GeneralExplore";
import { GeneralWallet } from "@/components/ui/icon/GeneralWallet";
import { GeneralBook } from "@/components/ui/icon/GeneralBook";
import { GeneralReport } from "@/components/ui/icon/GeneralReport";
import { GeneralSummary } from "@/components/ui/icon/GeneralSummary";
import { GeneralHelp } from "@/components/ui/icon/GeneralHelp";
import { GeneralSecurity } from "@/components/ui/icon/GeneralSecurity";
import { GeneralFaq } from "@/components/ui/icon/GeneralFaq";
import { CashoryButton } from "@/components/ui/common/cashory-button";
import { GeneralLogout } from "@/components/ui/icon/GeneralLogout";

interface SettingsOverviewProps {
  iconColor: string;
  onNavigate: (view: SettingsView) => void;
}

const SettingsOverview: FC<SettingsOverviewProps> = ({
  iconColor,
  onNavigate,
}) => {
  const router = useRouter();
  const { mutate: signOut, isPending } = useAuthSignOut();
  const { data: session } = useAuthSession();
  const user = session?.data?.user;

  return (
    <View className="flex-col gap-y-5">
      <View>
        <CashoryProfileCard
          name={user?.name || "User"}
          email={user?.email || "暂无邮箱"}
          avatarUrl={user?.image || ""}
          onPress={() => onNavigate("account")}
        />
      </View>
      <View className="flex-col gap-y-2.5">
        <SettingsLabel label="基本设置" />
        <CashorySettingsMenuItem
          label="账号设置"
          icon={<User color={iconColor} width={18} height={18} />}
          onPress={() => onNavigate("account")}
        />
        <CashorySettingsMenuItem
          label="通知设置"
          icon={<GeneralNotificat color={iconColor} width={18} height={18} />}
          onPress={() => onNavigate("notification")}
        />
        <CashorySettingsMenuItem
          label="外观设置"
          icon={<GeneralSliders color={iconColor} width={18} height={18} />}
        />
        <CashorySettingsMenuItem
          label="语言设置"
          icon={<GeneralExplore color={iconColor} width={18} height={18} />}
        />
      </View>
      <View className="flex-col gap-y-2.5">
        <SettingsLabel label="主要设置" />
        <CashorySettingsMenuItem
          label="交易设置"
          icon={<GeneralWallet color={iconColor} width={18} height={18} />}
          onPress={() => router.push("/transactions")}
        />
        <CashorySettingsMenuItem
          label="分类设置"
          icon={<GeneralBook color={iconColor} width={18} height={18} />}
          onPress={() => router.push("/category")}
        />
        <CashorySettingsMenuItem
          label="钱包设置"
          icon={<GeneralWallet color={iconColor} width={18} height={18} />}
          onPress={() => router.push("/wallet")}
        />
        <CashorySettingsMenuItem
          label="数据洞察"
          icon={<GeneralReport color={iconColor} width={18} height={18} />}
        />
        <CashorySettingsMenuItem
          label="我的概览"
          icon={<GeneralSummary color={iconColor} width={18} height={18} />}
        />
      </View>
      <View className="flex-col gap-y-2.5">
        <SettingsLabel label="客服支持" />
        <CashorySettingsMenuItem
          label="帮助中心"
          icon={<GeneralHelp color={iconColor} width={18} height={18} />}
        />
        <CashorySettingsMenuItem
          label="常见问题"
          icon={<GeneralFaq color={iconColor} width={18} height={18} />}
        />
        <CashorySettingsMenuItem
          label="隐私政策"
          icon={<GeneralSecurity color={iconColor} width={18} height={18} />}
        />
      </View>
      <View className="flex-col gap-y-2.5 mt-2">
        <CashoryButton
          variant="solid"
          color="danger"
          fullWidth
          isLoading={isPending}
          onPress={() => {
            signOut(undefined, {
              onSuccess: () => {
                router.replace("/(auth)/sign-in");
              },
            });
          }}
          className="rounded-[15px]"
        >
          <View className="items-center justify-center gap-x-2">
            <GeneralLogout color="#fff" width={20} height={20} />
            <Text className="text-white text-[16px] font-bold">退出登录</Text>
          </View>
        </CashoryButton>
      </View>
    </View>
  );
};
export default SettingsOverview;
