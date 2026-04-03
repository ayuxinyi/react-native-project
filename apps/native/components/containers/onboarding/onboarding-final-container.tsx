import AuthRow from "@/components/base/onboarding/auth-row";
import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor, useToast } from "heroui-native";
import { FC } from "react";
import {
  View,
  Text,
  ImageSourcePropType,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";

interface OnboardingFinalContainerProps {
  imageSource: ImageSourcePropType;
  bottomInset: number;
}

const OnboardingFinalContainer: FC<OnboardingFinalContainerProps> = ({
  imageSource,
  bottomInset,
}) => {
  const { width } = useWindowDimensions();
  const { toast } = useToast();
  const router = useRouter();

  const dangerColor = useThemeColor("danger");
  const accentColor = useThemeColor("accent");
  const textColor = useThemeColor("foreground");
  const heroWidth = Math.min(350, width - 36);
  const heroHeight = Math.round(heroWidth * 0.62);

  const socialProviders = [
    {
      label: "使用 Google 注册",
      provider: "Google",
      iconName: "logo-google" as const,
      iconSize: 30,
      iconColor: dangerColor,
    },
    {
      label: "使用 Apple 注册",
      provider: "Apple",
      iconName: "logo-apple" as const,
      iconSize: 32,
      iconColor: textColor,
    },
    {
      label: "使用 Facebook 注册",
      provider: "Facebook",
      iconName: "logo-facebook" as const,
      iconSize: 30,
      iconColor: accentColor,
    },
  ];

  const handleSocialPress = (provider: string) => {
    toast.show({
      label: `使用 ${provider} 注册`,
      variant: "default",
    });
  };

  return (
    <View className="flex-1 bg-brand-green-500">
      <View className="px-4.5 pt-13.5">
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{
            width: heroWidth,
            height: heroHeight,
            alignSelf: "center",
            borderRadius: 30,
          }}
        />
      </View>
      <View className="mt-4 flex-1 rounded-t-[30px] bg-surface">
        <ScrollView
          contentInsetAdjustmentBehavior="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 42,
            paddingBottom: bottomInset + 20,
            gap: 14,
          }}
        >
          <View className="items-center gap-2.5 px-2">
            <Text
              className="text-h2 leading-8.75 text-center"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.bold,
                color: textColor,
              }}
            >
              欢迎来到 Cashory！
            </Text>
            <Text
              className="text-body-sm leading-3.75 text-center text-muted"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.regular,
              }}
            >
              Cashory
              让您的财务管理变得简单、安全、智能，立即注册一个账号，开始使用。
            </Text>
          </View>

          <View className="mt-4 gap-3">
            <AuthRow
              label="使用邮箱登录"
              onPress={() => router.push("/(auth)/sign-in")}
              icon={
                <View className="size-8 rounded-full items-center justify-center bg-foreground">
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    className="text-background"
                  />
                </View>
              }
            />
            {socialProviders.map(socialProvider => (
              <AuthRow
                key={socialProvider.provider}
                label={socialProvider.label}
                icon={
                  <Ionicons
                    name={socialProvider.iconName}
                    size={socialProvider.iconSize}
                    color={socialProvider.iconColor}
                  />
                }
                onPress={() => handleSocialPress(socialProvider.provider)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default OnboardingFinalContainer;
