import { cn } from "heroui-native";
import { FC } from "react";
import { View, Text, Pressable } from "react-native";

interface CashorySectionHeaderProps {
  title: string;
  rightTitle?: string;
  rightTitleClassName?: string;
  onRightPress?: () => void;
  className?: string;
}

const CashorySectionHeader: FC<CashorySectionHeaderProps> = ({
  title,
  rightTitle,
  rightTitleClassName,
  onRightPress,
  className,
}) => {
  return (
    <View
      className={cn("flex-row items-center justify-between px-1", className)}
    >
      <Text className="text-foreground font-bold text-h4">{title}</Text>
      {rightTitle && (
        <Pressable onPress={onRightPress} disabled={!onRightPress}>
          <Text className={cn("text-[14px]", rightTitleClassName)}>
            {rightTitle}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
export default CashorySectionHeader;
