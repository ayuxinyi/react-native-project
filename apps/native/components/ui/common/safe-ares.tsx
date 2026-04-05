import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

// 由于SafeAreaView没有提供样式，所以需要手动添加
export const SafeAreaView = withUniwind(RNSafeAreaView);
