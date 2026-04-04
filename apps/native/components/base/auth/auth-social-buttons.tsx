import useAuthTheme from "@/hooks/use-auth-theme";
import { FC } from "react";
import { View } from "react-native";
import SocialIconButton from "../../ui/auth/social-icon-button";

interface AuthSocialButtonProps {
  onGooglePress: () => void;
  onApplePress: () => void;
  onFacebookPress: () => void;
}

const AuthSocialButtons: FC<AuthSocialButtonProps> = ({
  onGooglePress,
  onApplePress,
  onFacebookPress,
}) => {
  const { colors } = useAuthTheme();

  return (
    <View className="flex-row items-center justify-between gap-3.5">
      <SocialIconButton
        iconName="logo-google"
        onPress={onGooglePress}
        iconColor={colors.textPrimary}
      />
      <SocialIconButton
        iconName="logo-apple"
        onPress={onApplePress}
        iconColor={colors.textPrimary}
      />
      <SocialIconButton
        iconName="logo-facebook"
        onPress={onFacebookPress}
        iconColor={colors.textPrimary}
      />
    </View>
  );
};
export default AuthSocialButtons;
