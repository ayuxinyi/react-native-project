import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface OnboardingNextButtonProps {
  onPress: () => void;
}

const OnboardingNextButton = ({ onPress }: OnboardingNextButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="下一步"
      onPress={onPress}
      className="size-17.5 rounded-full items-center justify-center bg-brand-green-500"
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Ionicons name="arrow-forward" size={32} color="#fff" />
    </Pressable>
  );
};
export default OnboardingNextButton;
