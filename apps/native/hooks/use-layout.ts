import { useWindowDimensions } from "react-native";
import { useMemo } from "react";

export const useLayout = (horizontalPadding = 48) => {
  const { width, height } = useWindowDimensions();

  return useMemo(
    () => ({
      width,
      height,
      contentWidth: Math.min(346, width - horizontalPadding),
      ctaWidth: Math.min(345, width - horizontalPadding),
      modalWidth: Math.min(376, width - 16),
    }),
    [width, height, horizontalPadding],
  );
};
