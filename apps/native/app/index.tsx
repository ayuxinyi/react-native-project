import { useAuthSession } from "@/hooks/use-auth-session";
import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import OnboardingTemplate from "@/components/templates/onboarding-template";
import OnboardingLoadingSection from "@/components/sections/onboarding-loading-section";

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isLoading } = useAuthSession();

  useEffect(() => {
    if (pathname !== "/") return;

    if (!isLoading && session?.data?.user) {
      // router.replace()
      const user = session.data.user;
      if (user?.onboardingCompleted) {
        router.replace("/(drawer)/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [isLoading, session, router, pathname]);

  if (isLoading) return <OnboardingLoadingSection />;

  return <OnboardingTemplate />;
};
export default Index;
