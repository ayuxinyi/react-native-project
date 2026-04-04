import AuthFooterLink from "@/components/base/auth/auth-footer-link";
import AuthPrimaryButton from "@/components/base/auth/auth-primary-button";
import AuthSeparator from "@/components/base/auth/auth-separator";
import AuthSocialButtons from "@/components/base/auth/auth-social-buttons";
import BackButton from "@/components/ui/back-button";
import { SafeAreaView } from "@/components/ui/safe-ares";
import { SignInValues, useAuthSignIn } from "@/hooks/use-auth-session";
import useAuthTheme from "@/hooks/use-auth-theme";
import { useLayout } from "@/hooks/use-layout";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@react-native-project/schema";
import { to } from "await-to-js";
import { useRouter } from "expo-router";
import { FieldError, TextField, useToast } from "heroui-native";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const SignInTemplate = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { colors } = useAuthTheme();

  const { contentWidth, ctaWidth } = useLayout();

  const [authError, setAuthError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordInputRef = useRef<TextInput | null>(null);

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    clearErrors,
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = useAuthSignIn();

  const onSubmit = async (data: SignInValues) => {
    const [error] = await to(signIn.mutateAsync(data));
    if (error) {
      setAuthError(error.message);
      toast.show({
        label: error.message,
        variant: "danger",
      });
      return;
    }
    toast.show({
      label: "登录成功",
      variant: "success",
    });
    reset();
    router.replace("/");
  };

  const emailError = errors.email?.message || authError;

  return (
    <SafeAreaView className="bg-surface flex-1">
      <KeyboardAvoidingView
        className="flex-1 bg-surface"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 20,
            paddingHorizontal: 24,
          }}
        >
          <View style={{ width: contentWidth }}>
            <BackButton
              onPress={() => router.back()}
              color={colors.socialBackground}
              accessibilityLabel="返回首页"
            />

            <View className="mt-5.5 gap-2.5">
              <Text className="text-h2 leading-8.75 font-bold text-foreground">
                欢迎回来! 👋
              </Text>
              <Text className="text-body-sm leading.3.75 font-sans text-muted">
                Cashory继续跟踪您的财务，请登录您的Cashory账户
              </Text>
            </View>
          </View>

          <View className="mt-8.5 gap-3.5" style={{ width: contentWidth }}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextField isInvalid={!!emailError}>
                  <TextInput
                    value={value}
                    placeholder="test@example.com"
                    // 禁止自动首字母大写，邮箱/密码必须关闭，否则输入会被改变
                    autoCapitalize="none"
                    // 告诉系统这是邮箱字段，触发自动填充建议（从钥匙串/密码管理器）
                    autoComplete="email"
                    // iOS 专属，告诉 iOS 这是邮箱字段
                    // 配合 iCloud 钥匙串，会显示已保存的邮箱地址建议
                    textContentType="emailAddress"
                    // 弹出专用邮箱键盘，底部会有 @ 和 . 快捷键
                    keyboardType="email-address"
                    // 键盘右下角的按钮显示"下一项"而不是"换行"
                    // 常用于表单多字段跳转
                    returnKeyType="next"
                    // 按下回车键时触发 onSubmitEditing，而不是插入换行符
                    submitBehavior="submit"
                    // 按下回车/下一项时，焦点跳转到密码输入框
                    // 配合 returnKeyType="next" 实现表单字段顺序跳转
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    onBlur={onBlur}
                    onChangeText={text => {
                      clearErrors("email");
                      setAuthError(null);
                      onChange(text);
                    }}
                    className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75 font-medium text-foreground w-full bg-surface-secondary"
                  />
                  {emailError && (
                    <FieldError>
                      <Text className="mt-1 text-danger">{emailError}</Text>
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
                      className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75 w-full pr-6 bg-surface-secondary text-foreground"
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
                        style={{ color: colors.textSecondary }}
                      />
                    </Pressable>
                  </View>
                  {errors.password?.message && (
                    <FieldError>
                      <Text className="mt-1 text-danger">
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
                isSubmitting || signIn.isPending ? "登录中..." : "账号登录"
              }
              disabled={isSubmitting || signIn.isPending}
            />

            <AuthSeparator />

            <AuthSocialButtons
              onGooglePress={() => console.log("Google")}
              onApplePress={() => console.log("Apple")}
              onFacebookPress={() => console.log("Facebook")}
            />

            <AuthFooterLink
              prefix="还没有账号吗?"
              actionLabel="去注册"
              onActionPress={() => router.replace("/(auth)/sign-up")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignInTemplate;
