import useAuthTheme from "@/hooks/use-auth-theme";
import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Text,
  Platform,
  ScrollView,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { FieldError, TextField, useToast } from "heroui-native";
import { signUpSchema } from "@react-native-project/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { to } from "await-to-js";
import { SignUpValues, useAuthSignUp } from "@/hooks/use-auth-session";
import AuthPrimaryButton from "@/components/base/auth/auth-primary-button";
import AuthSeparator from "@/components/base/auth/auth-separator";
import AuthSocialButtons from "@/components/base/auth/auth-social-buttons";
import AuthFooterLink from "@/components/base/auth/auth-footer-link";
import { useLayout } from "@/hooks/use-layout";
import BackButton from "@/components/ui/back-button";

const SignUpTemplate = () => {
  const { colors } = useAuthTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { toast } = useToast();

  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { contentWidth, ctaWidth } = useLayout();

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const emailError = errors.email?.message ? errors.email.message : authError;

  const signUpMutation = useAuthSignUp();
  const onSubmit = async (data: SignUpValues) => {
    setAuthError(null);
    const [error] = await to(signUpMutation.mutateAsync(data));
    if (error) {
      console.log(333);
      toast.show({
        variant: "danger",
        label: error.message,
      });
      return;
    }
    reset();
    toast.show({
      variant: "success",
      label: "账号注册成功！",
    });
    router.replace({
      pathname: "/onboarding",
      params: {
        name: data.name.trim(),
        email: data.email.trim(),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.screenBackground }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ width: contentWidth }}>
          <BackButton
            onPress={() => router.back()}
            color={colors.socialBackground}
            accessibilityLabel="返回登录"
          />
          <View className="mt-5.5 gap-2.5">
            <Text
              className="text-h2 leading-8.75"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.bold,
                color: colors.textPrimary,
              }}
            >
              欢迎注册！🚀
            </Text>
            <Text
              className="text-body-sm leading-3.75"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.regular,
                color: colors.textSecondary,
              }}
            >
              创建您的 Cashory 账户，开始追踪收入、支出以及一切财务动向
            </Text>
          </View>
        </View>
        <View className="mt-8.5 gap-3.5" style={{ width: contentWidth }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField isInvalid={!!errors.name}>
                <TextInput
                  value={value}
                  onChangeText={text => {
                    setAuthError(null);
                    clearErrors("name");
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  placeholder="请输入登录账号"
                  autoCapitalize="words"
                  textContentType="name"
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75"
                  style={{
                    fontFamily: ONBOARDING_FONT_FAMILY.medium,
                    color: colors.textPrimary,
                    backgroundColor: colors.inputBackground,
                  }}
                />
                {errors.name?.message && (
                  <FieldError>
                    <Text style={{ color: colors.error }} className="mt-1">
                      {String(errors.name.message)}
                    </Text>
                  </FieldError>
                )}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField isInvalid={!!emailError}>
                <TextInput
                  ref={emailInputRef}
                  value={value}
                  onChangeText={text => {
                    setAuthError(null);
                    clearErrors("email");
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  placeholder="user@example.com"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75"
                  style={{
                    fontFamily: ONBOARDING_FONT_FAMILY.medium,
                    color: colors.textPrimary,
                    backgroundColor: colors.inputBackground,
                  }}
                />
                {emailError && (
                  <FieldError>
                    <Text style={{ color: colors.error }} className="mt-1">
                      {String(emailError)}
                    </Text>
                  </FieldError>
                )}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField isInvalid={!!errors.password}>
                <View
                  className="flex relative items-center"
                  style={{ width: contentWidth }}
                >
                  <TextInput
                    ref={passwordInputRef}
                    value={value}
                    onChangeText={text => {
                      setAuthError(null);
                      clearErrors("password");
                      onChange(text);
                    }}
                    onBlur={onBlur}
                    placeholder="请输入密码"
                    secureTextEntry={!isPasswordVisible}
                    autoComplete="off"
                    textContentType="none"
                    autoCorrect={false}
                    spellCheck={false}
                    returnKeyType="go"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75 w-full pr-6"
                    style={{
                      backgroundColor: colors.inputBackground,
                      color: colors.textPrimary,
                    }}
                  />

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      isPasswordVisible ? "隐藏密码" : "显示密码"
                    }
                    onPress={() => setIsPasswordVisible(prev => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                  >
                    <Ionicons
                      name={
                        isPasswordVisible ? "eye-outline" : "eye-off-outline"
                      }
                      size={24}
                      color={colors.textSecondary}
                    />
                  </Pressable>
                </View>
                {errors.password?.message && (
                  <FieldError>
                    <Text style={{ color: colors.error }} className="mt-1">
                      {String(errors.password.message)}
                    </Text>
                  </FieldError>
                )}
              </TextField>
            )}
          />
        </View>

        <View className="mt-auto gap-5.25" style={{ width: ctaWidth }}>
          <AuthPrimaryButton
            onPress={handleSubmit(onSubmit)}
            label={
              isSubmitting || signUpMutation.isPending
                ? "注册中..."
                : "注册账号"
            }
            disabled={isSubmitting || signUpMutation.isPending}
          />

          <AuthSeparator />
          <AuthSocialButtons
            onGooglePress={() => console.log("Google")}
            onApplePress={() => console.log("Apple")}
            onFacebookPress={() => console.log("Facebook")}
          />
          <AuthFooterLink
            prefix="已经有账号了？"
            actionLabel="去登录"
            onActionPress={() => router.replace("/(auth)/sign-in")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignUpTemplate;
