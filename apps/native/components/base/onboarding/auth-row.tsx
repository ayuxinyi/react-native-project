import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import { FC, ReactNode } from "react";
import { View, Text, Pressable } from "react-native";

interface AuthRowProps {
  label: string;
  icon: ReactNode;
  onPress: () => void;
}

const AuthRow: FC<AuthRowProps> = ({ label, icon, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="h-15 rounded-xl px-8 flex-row items-center bg-surface-secondary"
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <View className="w-8 items-center">{icon}</View>
      <Text
        className="ml-8 text-base leading-5 text-surface-foreground"
        style={{ fontFamily: ONBOARDING_FONT_FAMILY.regular }}
      >
        {label}
      </Text>
    </Pressable>
  );
};
export default AuthRow;
