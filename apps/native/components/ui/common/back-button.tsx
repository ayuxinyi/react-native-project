import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { FC } from "react";
import { Pressable } from "react-native";

interface BackButtonProps {
  onPress: () => void;
  color: string;
  iconColor?: string;
  accessibilityLabel?: string;
}

const BackButton: FC<BackButtonProps> = ({
  onPress,
  color,
  iconColor,
  accessibilityLabel,
}) => {
  const defaultIconColor = useThemeColor("foreground");

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      className="size-14 rounded-full items-center justify-center"
      style={({ pressed }) => ({
        backgroundColor: color,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Ionicons
        name="arrow-back"
        size={28}
        color={iconColor || defaultIconColor}
      />
    </Pressable>
  );
};
export default BackButton;
