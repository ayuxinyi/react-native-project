import useAuthTheme from "@/hooks/use-auth-theme";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable } from "react-native";

interface SocialIconButtonProps {
  iconName: "logo-google" | "logo-apple" | "logo-facebook";
  iconColor?: string;
  onPress?: () => void;
}

const SocialIconButton: FC<SocialIconButtonProps> = ({
  iconName,
  iconColor,
  onPress,
}) => {
  const { colors } = useAuthTheme();
  const resolvedIconColor = iconColor ?? colors.textPrimary;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="h-17.5 flex-1 rounded-full items-center justify-center"
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        backgroundColor: colors.socialBackground,
      })}
    >
      <Ionicons name={iconName} size={24} color={resolvedIconColor} />
    </Pressable>
  );
};
export default SocialIconButton;
