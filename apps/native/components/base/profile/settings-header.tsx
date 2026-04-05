import { GeneralChevronRi } from "@/components/ui/icon/GeneralChevronRi";
import { FC } from "react";
import { View, Text, Pressable } from "react-native";

interface SettingsHeaderProps {
  title: string;
  onBack?: () => void;
  iconColor?: string;
}

const SettingsHeader: FC<SettingsHeaderProps> = ({
  title,
  onBack,
  iconColor,
}) => {
  return (
    <View className="flex-row items-center gap-x-2.5 mb-6 w-full pt-1">
      {onBack && (
        <Pressable
          onPress={onBack}
          className="size-12.5 rounded-[40px] bg-brand-flashwhite dark:bg-dark-charcoal-green items-center justify-center"
        >
          <View style={{ transform: [{ rotate: "180deg" }] }}>
            <GeneralChevronRi color={iconColor} width={24} height={24} />
          </View>
        </Pressable>
      )}
      <Text className="text-h3 text-foreground font-bold">{title}</Text>
    </View>
  );
};
export default SettingsHeader;
