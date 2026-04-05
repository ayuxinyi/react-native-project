import { Country } from "@/components/templates/onboarding-flow";
import BackButton from "@/components/ui/common/back-button";
import useAuthTheme from "@/hooks/use-auth-theme";
import { useLayout } from "@/hooks/use-layout";
import { COUNTRIES } from "@/lib/constants/countries";
import { Ionicons } from "@expo/vector-icons";
import { Radio, RadioGroup } from "heroui-native";
import { FC, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import AuthPrimaryButton from "../auth/auth-primary-button";

interface SelectCountryProps {
  onNext: (country: Country) => void;
  onBack: () => void;
}

const SelectCountry: FC<SelectCountryProps> = ({ onNext, onBack }) => {
  const { contentWidth, ctaWidth } = useLayout();
  const { colors } = useAuthTheme();

  const [searchCountry, setSearchCountry] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | undefined>(
    undefined,
  );

  const selectedCountry = useMemo(
    () => COUNTRIES.find(c => c.code === selectedCode),
    [selectedCode],
  );

  const filteredCountries = useMemo(
    () =>
      COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(searchCountry.toLowerCase()),
      ),
    [searchCountry],
  );

  const handleNext = () => {
    if (selectedCountry) {
      onNext(selectedCountry);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ paddingTop: 18, paddingHorizontal: 24 }}>
        <View style={{ width: contentWidth }}>
          <BackButton
            onPress={onBack}
            color={colors.inputBackground}
            accessibilityLabel="返回上一步"
          />
          <View className="mt-7 gap-2.5">
            <Text className="text-h2 leading-8.75 font-bold text-foreground">
              请选择您的国家
            </Text>
            <Text className="text-body-sm leading-3.75 font-sans text-muted">
              选择您的国家后，请点击下一步继续完善您的个人信息。
            </Text>
          </View>
        </View>

        <View className="mt-5.5" style={{ width: contentWidth }}>
          <View className="h-17.5 rounded-[15px] flex-row items-center justify-between px-5 bg-surface-secondary w-full">
            <TextInput
              value={searchCountry}
              onChangeText={text => setSearchCountry(text)}
              placeholder="输入关键词进行搜索..."
              className="flex-1 text-body-sm leading-3.75 font-medium text-foreground placeholder:text-muted"
            />
            <Ionicons
              name="search-outline"
              size={24}
              color={
                searchCountry ? colors.textPrimary : colors.inputPlaceholder
              }
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 20,
        }}
      >
        <RadioGroup
          value={selectedCode}
          onValueChange={setSelectedCode}
          variant="secondary"
          style={{ width: contentWidth, marginTop: 22, gap: 10 }}
        >
          {filteredCountries.map(country => (
            <RadioGroup.Item
              key={country.code}
              value={country.code}
              style={{
                backgroundColor: colors.inputBackground,
                borderWidth: selectedCode === country.code ? 2 : 0,
                borderColor: colors.textPrimary,
                height: 70,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <View className="flex-row items-center gap-3.25">
                <Text className="text-[30px]">{country.flag}</Text>
                <Text className="text-body-sm leading-3.75 font-medium text-foreground">
                  {country.name}
                </Text>
              </View>
              <Radio />
            </RadioGroup.Item>
          ))}
        </RadioGroup>
      </ScrollView>

      {/* 固定底部按钮 */}
      <View style={{ paddingHorizontal: 24 }}>
        <View style={{ width: ctaWidth }}>
          <AuthPrimaryButton
            onPress={handleNext}
            label="下一步"
            disabled={!selectedCountry}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default SelectCountry;
