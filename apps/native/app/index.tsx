import { useAuthSession } from "@/hooks/use-auth-session";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import OnboardingTemplate from "@/components/templates/onboarding-template";
import OnboardingLoadingSection from "@/components/sections/onboarding-loading-section";

const Index = () => {
  const router = useRouter();

  const { data: session, isLoading } = useAuthSession();

  useEffect(() => {
    console.log(isLoading, session?.data?.user);
    if (!isLoading && session?.data?.user) {
      // router.replace()
      const user = session.data.user;
      // TODO: 处理用户信息
    }
  }, [isLoading, session, router]);

  if (isLoading) return <OnboardingLoadingSection />;

  return <OnboardingTemplate />;
};
export default Index;
