import { FC } from "react";
import { View, Text, Pressable } from "react-native";

interface AuthFooterLinkProps {
  prefix: string;
  actionLabel: string;
  onActionPress: () => void;
}

const AuthFooterLink: FC<AuthFooterLinkProps> = ({
  prefix,
  actionLabel,
  onActionPress,
}) => {
  return (
    <View className="h-4.5 flex-row items-center justify-center">
      <Text className="text-body-sm leading-3.75 text-foreground font-sans">
        {prefix}{" "}
      </Text>
      <Pressable onPress={onActionPress} accessibilityRole="button">
        <Text className="text-body-sm leading-3.75 text-foreground font-bold">
          {actionLabel}
        </Text>
      </Pressable>
    </View>
  );
};
export default AuthFooterLink;
