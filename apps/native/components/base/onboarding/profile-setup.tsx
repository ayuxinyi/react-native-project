import { Country, ProfileData } from "@/components/templates/onboarding-flow";
import useAuthTheme from "@/hooks/use-auth-theme";
import { useLayout } from "@/hooks/use-layout";
import { Ionicons } from "@expo/vector-icons";
import { to } from "await-to-js";
import { Avatar, Checkbox, ControlField } from "heroui-native";
import { FC, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AuthPrimaryButton from "../auth/auth-primary-button";

interface ProfileSetupProps {
  userData: {
    name: string;
    email: string;
  };
  country: Country;
  onNext: (profileData: ProfileData) => Promise<void>;
  onBack: () => void;
}

const ProfileSetup: FC<ProfileSetupProps> = ({
  userData,
  country,
  onNext,
  onBack,
}) => {
  const { contentWidth, ctaWidth } = useLayout();
  const { colors } = useAuthTheme();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const pickImage = async () => {
    const [error, result] = await to(
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      }),
    );

    if (error) {
      console.error(error);
      return;
    }
    if (!result.canceled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (agreedToTerms) {
      onNext({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        profileImage: profileImage || undefined,
        country,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingTop: 18,
          paddingBottom: 20,
          paddingHorizontal: 24,
        }}
      >
        <View className="items-center gap-2.5" style={{ width: 327 }}>
          <Text className="text-h2 leading-8.75 text-center font-bold text-foreground">
            添加您的个人信息
          </Text>
          <Text className="text-body-sm leading-3.75 text-center font-sans text-muted">
            请完善您的个人基本信息，包括姓名、手机号等。
          </Text>
        </View>
        <View className="mt-5.5">
          <Pressable
            className="items-center justify-center size-25 bg-surface-secondary rounded-full"
            onPress={pickImage}
          >
            <Avatar
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
              alt="个人头像"
            >
              {profileImage ? (
                <Avatar.Image source={{ uri: profileImage }} asChild>
                  <Image
                    className="size-full rounded-full"
                    resizeMode="cover"
                  />
                </Avatar.Image>
              ) : (
                <Avatar.Fallback>
                  <Ionicons
                    name="person-outline"
                    size={40}
                    color={colors.textSecondary}
                  />
                </Avatar.Fallback>
              )}
            </Avatar>
          </Pressable>
        </View>
        <View className="mt-5.5 gap-2.5" style={{ width: contentWidth }}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="admin"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
            className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75 font-sans text-foreground bg-surface-secondary"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="admin@example.com"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75 font-sans text-foreground bg-surface-secondary"
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="1234567890"
            autoCapitalize="none"
            autoComplete="tel"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75 font-sans text-foreground bg-surface-secondary"
          />
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="******"
              autoComplete="new-password"
              textContentType="newPassword"
              secureTextEntry={!showPassword}
              className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75 font-sans text-foreground bg-surface-secondary"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={showPassword ? "隐藏密码" : "显示密码"}
              onPress={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>
        <View className="mt-5.25 gap-5.75" style={{ width: ctaWidth }}>
          <ControlField
            isSelected={agreedToTerms}
            onSelectedChange={setAgreedToTerms}
            className="flex-row items-center gap-1.25"
          >
            <ControlField.Indicator>
              <Checkbox variant="secondary" />
            </ControlField.Indicator>
            <Text className="text-body-sm leading-3.75 flex-1 text-foreground font-sans">
              同意即表示您同意我们的服务条款和隐私政策。
            </Text>
          </ControlField>
          <AuthPrimaryButton
            onPress={handleSubmit}
            label="完成"
            disabled={!agreedToTerms || !name || !email}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default ProfileSetup;
