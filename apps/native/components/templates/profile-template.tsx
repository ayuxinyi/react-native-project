import { ScrollView } from "react-native";
import Container from "../ui/common/container";
import useAuthTheme from "@/hooks/use-auth-theme";
import { useCallback, useState } from "react";
import SettingsHeader from "../base/profile/settings-header";
import SettingsOverview from "../containers/profile/settings-overview";
import AccountView from "../containers/profile/account-view";
import NotificationSettingsView from "../containers/profile/notification-settings-view";
import { SettingsView } from "@/types/profile";

const ProfileTemplate = () => {
  const { isDark } = useAuthTheme();
  const iconColor = isDark ? "#ffffff" : "#000000";
  const [currentView, setCurrentView] = useState<SettingsView>("overview");

  const getTitle = useCallback(() => {
    switch (currentView) {
      case "overview":
        return "设置概览";
      case "account":
        return "账号设置";
      case "notification":
        return "通知设置";
    }
  }, [currentView]);

  const handleBack = () => {
    if (currentView !== "overview") {
      setCurrentView("overview");
    }
  };

  return (
    <Container className="p-4" isScrollable={false}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        className="pt-2.5 pb-30"
      >
        <SettingsHeader
          title={getTitle()}
          onBack={currentView !== "overview" ? handleBack : undefined}
          iconColor={iconColor}
        />
        {currentView === "overview" && (
          <SettingsOverview iconColor={iconColor} onNavigate={setCurrentView} />
        )}
        {currentView === "account" && <AccountView isDark={isDark} />}
        {currentView === "notification" && <NotificationSettingsView />}
      </ScrollView>
    </Container>
  );
};
export default ProfileTemplate;
