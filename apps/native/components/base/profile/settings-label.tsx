import { Text } from "react-native";

interface SettingsLabelProps {
  label: string;
}

const SettingsLabel = ({ label }: SettingsLabelProps) => {
  return (
    <Text className="text-[16px] text-foreground font-bold mb-2.5">
      {label}
    </Text>
  );
};
export default SettingsLabel;
