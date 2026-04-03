import { useCallback, useEffect, useMemo, useState } from "react";
import { View, PanResponder } from "react-native";

import OnboardingLoadingSection from "../sections/onboarding-loading-section";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OnboardingSlideContainer from "../containers/onboarding/onboarding-slide-container";
import OnboardingFinalContainer from "../containers/onboarding/onboarding-final-container";

const SPLASH_DURATION_MS = 1500;
const onboardingSlides = [
  {
    id: "slide-1",
    kind: "slide",
    imageSource: require("../../assets/images/onboarding/onboarding-left.png"),
    title: "掌控你的\n每一分钱",
    description:
      "在一个简洁的应用中追踪收入、支出，轻松管理你的财务，随时掌握资金动向。",
  },
  {
    id: "slide-2",
    kind: "slide",
    imageSource: require("../../assets/images/onboarding/onboarding-right.png"),
    title: "你的智能\n理财助手",
    description:
      "快速记录收支，追踪收入来源，管理日常开销，让你的财务状况一目了然、井井有条。",
  },
  {
    id: "slide-3",
    kind: "final",
    imageSource: require("../../assets/images/onboarding/onboarding-3.png"),
  },
] as const;

const OnboardingTemplate = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, SPLASH_DURATION_MS);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const shiftSlide = useCallback(
    (step: -1 | 1) =>
      setActiveSlideIndex(prev => {
        const nextIndex = prev + step;
        return Math.min(Math.max(0, nextIndex), onboardingSlides.length - 1);
      }),
    [],
  );

  const activeSlide = useMemo(
    () => onboardingSlides[activeSlideIndex],
    [activeSlideIndex],
  );
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 12,
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx <= -60) {
            shiftSlide(1);
            return;
          }
          if (gestureState.dx >= 60) {
            shiftSlide(-1);
            return;
          }
        },
      }),
    [shiftSlide],
  );

  const handleNext = useCallback(() => {
    shiftSlide(1);
  }, [shiftSlide]);

  if (isSplashVisible) return <OnboardingLoadingSection />;

  return (
    <>
      <View
        className="flex-1 bg-brand-green-500"
        {...(activeSlide.kind === "slide" ? panResponder.panHandlers : {})}
      >
        {activeSlide.kind === "slide" ? (
          <OnboardingSlideContainer
            imageSource={activeSlide.imageSource}
            title={activeSlide.title}
            description={activeSlide.description}
            onNext={handleNext}
            bottomInset={insets.bottom}
          />
        ) : (
          <OnboardingFinalContainer
            imageSource={activeSlide.imageSource}
            bottomInset={insets.bottom}
          />
        )}
      </View>
    </>
  );
};
export default OnboardingTemplate;
