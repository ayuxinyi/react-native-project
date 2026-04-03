import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import { useThemeColor } from "heroui-native";
import { FC, PropsWithChildren } from "react";
import { View, Text } from "react-native";

interface OnboardingContentCardProps {
  title: string;
  description: string;
  headingWidth: number;
  headingTop: number;
  bottomInset: number;
}

const CARD_BOTTOM_PADDING = 20;

const OnboardingContentCard: FC<
  PropsWithChildren<OnboardingContentCardProps>
> = ({
  children,
  title,
  description,
  headingWidth,
  headingTop,
  bottomInset,
}) => {
  const surfaceColor = useThemeColor("surface");
  const titleColor = useThemeColor("foreground");
  const descriptionColor = useThemeColor("muted");

  return (
    <View
      className="size-full rounded-t-[30px] items-center"
      style={{
        paddingTop: headingTop,
        paddingBottom: bottomInset + CARD_BOTTOM_PADDING,
        backgroundColor: surfaceColor,
      }}
    >
      <View className="items-center gap-2.5" style={{ width: headingWidth }}>
        <Text
          className="text-h2 leading-8.75 text-center"
          style={{ fontFamily: ONBOARDING_FONT_FAMILY.bold, color: titleColor }}
        >
          {title}
        </Text>
        <Text
          className="text-body-sm leading-3.75 text-center"
          style={{
            fontFamily: ONBOARDING_FONT_FAMILY.regular,
            color: descriptionColor,
          }}
        >
          {description}
        </Text>
      </View>
      {children}
    </View>
  );
};
export default OnboardingContentCard;
