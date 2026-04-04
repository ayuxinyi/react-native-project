import OnboardingFlow from "@/components/templates/onboarding-flow";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
const Onboarding = () => {
  const params = useLocalSearchParams<{ name: string; email: string }>();
  const { data: session } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    const user = session?.data?.user;
    // 如果用户已经完成引导，跳转到首页
    // TODO:稍后会修改路由跳转
    if (user?.onboardingCompleted) {
      router.replace("/");
      return;
    }
  }, [session, router]);

  const userData = useMemo(
    () => ({
      name: params.name || session?.data?.user.name || "",
      email: params.email || session?.data?.user.email || "",
    }),
    [params, session],
  );
  // 没有用户信息，跳转到登录页
  if (!session || !session.data?.user) {
    router.push("/(auth)/sign-in");
    return null;
  }
  const handleComplete = () => {};

  return <OnboardingFlow userData={userData} onComplete={handleComplete} />;
};
export default Onboarding;
