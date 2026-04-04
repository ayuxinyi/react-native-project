import { FC, useState } from "react";
import SelectCountry from "../base/onboarding/select-country";
import ProfileSetup from "../base/onboarding/profile-setup";
import { SafeAreaView } from "../ui/safe-ares";
import {
  useCompleteOnboarding,
  useUpdateProfile,
} from "@/hooks/use-auth-session";
import { to } from "await-to-js";
import { useToast } from "heroui-native";
import { SuccessModal } from "../base/onboarding/success-modal";

type OnboardingStep = "country" | "profile" | "success";

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  country: Country;
  profileImage?: string;
}

interface OnboardingFlowProps {
  userData: {
    name: string;
    email: string;
  };
  onComplete: () => void;
}

const OnboardingFlow: FC<OnboardingFlowProps> = ({ userData, onComplete }) => {
  const updateProfile = useUpdateProfile();
  const completeOnboarding = useCompleteOnboarding();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<OnboardingStep>("country");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setCurrentStep("profile");
  };

  const handleProfileComplete = async (profileData: ProfileData) => {
    const [error] = await to(
      updateProfile.mutateAsync({
        name: profileData.name,
        country: profileData.country.name,
        image: profileData.profileImage,
        phone: profileData.phone,
      }),
    );

    if (error) {
      toast.show({
        label: error.message || "更新失败，请稍后重试",
        variant: "danger",
      });
      return;
    }

    const [completeError] = await to(completeOnboarding.mutateAsync());

    if (completeError) {
      toast.show({
        label: completeError.message || "完成注册失败，请稍后重试",
        variant: "danger",
      });
      return;
    }

    setCurrentStep("success");
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    if (currentStep === "profile") {
      setCurrentStep("country");
    }
    if (currentStep === "success") {
      setCurrentStep("profile");
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-surface">
        {currentStep === "country" && (
          <SelectCountry onNext={handleCountrySelect} onBack={() => {}} />
        )}
        {currentStep === "profile" && selectedCountry && (
          <ProfileSetup
            userData={userData}
            country={selectedCountry}
            onNext={handleProfileComplete}
            onBack={handleBack}
          />
        )}
      </SafeAreaView>
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onComplete();
        }}
      />
    </>
  );
};
export default OnboardingFlow;
