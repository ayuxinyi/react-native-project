import { cn } from "heroui-native";
import { FC, PropsWithChildren } from "react";
import { View, ViewProps, ScrollViewProps, ScrollView } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { SafeAreaView } from "./safe-ares";

type ContainerProps = AnimatedProps<ViewProps> & {
  className?: string;
  isScrollable?: boolean;
  scrollViewProps?: Omit<ScrollViewProps, "contentContainerStyle">;
};

const AnimatedView = Animated.createAnimatedComponent(View);

const Container: FC<PropsWithChildren<ContainerProps>> = props => {
  const { className, isScrollable, scrollViewProps, children, ...restProps } =
    props;

  return (
    <AnimatedView
      className={cn("flex-1 bg-background", className)}
      {...restProps}
    >
      <SafeAreaView className="flex-1">
        {isScrollable ? (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            {...scrollViewProps}
          >
            {children}
          </ScrollView>
        ) : (
          <View className="flex-1 w-full">{children}</View>
        )}
      </SafeAreaView>
    </AnimatedView>
  );
};
export default Container;
