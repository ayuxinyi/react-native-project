import useAuthTheme from "@/hooks/use-auth-theme";
import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import { FC } from "react";
import { Text, Pressable } from "react-native";

interface AuthPrimaryButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
}

const AuthPrimaryButton: FC<AuthPrimaryButtonProps> = ({
  onPress,
  label,
  disabled,
}) => {
  const { colors } = useAuthTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className="h-16.25 rounded-full items-center justify-center"
      style={({ pressed }) => ({
        opacity: pressed || disabled ? 0.85 : 1,
        backgroundColor: colors.buttonBackground,
      })}
    >
      <Text
        className="text-h5 leading-5"
        style={{
          fontFamily: ONBOARDING_FONT_FAMILY.bold,
          color: colors.textInverse,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};
export default AuthPrimaryButton;
