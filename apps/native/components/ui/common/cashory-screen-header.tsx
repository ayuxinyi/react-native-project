import { cn, useThemeColor } from "heroui-native";
import { FC, ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { StyledGeneralOption } from "../icon/GeneralOption";
import { useRouter } from "expo-router";

interface CashoryScreenHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: ReactNode;
  className?: string;
}

const CashoryScreenHeader: FC<CashoryScreenHeaderProps> = ({
  title,
  showBack = true,
  onBack,
  rightElement,
  className = "mb-8",
}) => {
  const router = useRouter();
  const iconColor = useThemeColor("foreground");

  return (
    <View
      className={cn(
        "flex-row items-center justify-between w-full pt-1",
        className,
      )}
    >
      <View className="flex-row items-center gap-x-2.5">
        {showBack && (
          <Pressable
            hitSlop={8}
            className="size-12.5 rounded-[40px] items-center bg-brand-flashwhite dark:bg-brand-green-800"
            onPress={() => (onBack ? onBack() : router.back())}
          >
            <StyledGeneralOption width={24} color={iconColor} height={24} />
          </Pressable>
        )}
        <Text className="text-2xl font-bold text-brand-green-900 dark:text-brand-flashwhite">
          {title}
        </Text>
      </View>
      {rightElement && (
        <View className="flex-row items-center gap-x-1.5">{rightElement}</View>
      )}
    </View>
  );
};
export default CashoryScreenHeader;
