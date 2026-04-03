import { StatusBar } from "expo-status-bar";
import OnboardingSplashContainer from "../containers/onboarding/onboarding-splash-container";

const OnboardingLoadingSection = () => {
  return (
    <>
      <StatusBar style="auto" />
      <OnboardingSplashContainer message="Cashory 让您的财务管理变得简单、安全、智能" />
    </>
  );
};
export default OnboardingLoadingSection;
