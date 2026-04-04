import useAuthTheme from "@/hooks/use-auth-theme";
import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import { View, Text } from "react-native";

interface AuthSeparatorProps {
  text?: string;
}

const AuthSeparator = ({ text = "或使用以下方式" }: AuthSeparatorProps) => {
  const { colors } = useAuthTheme();

  return (
    <View className="flex-row items-center gap-4.5">
      <View
        className="h-px flex-1"
        style={{ backgroundColor: colors.separator }}
      />
      <Text
        className="text-body-sm leading-3.75"
        style={{
          fontFamily: ONBOARDING_FONT_FAMILY.regular,
          color: colors.textSecondary,
        }}
      >
        {text}
      </Text>
      <View
        className="h-px flex-1"
        style={{ backgroundColor: colors.separator }}
      />
    </View>
  );
};
export default AuthSeparator;
