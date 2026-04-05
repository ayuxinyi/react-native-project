import { ThemeToggle } from "@/components/theme-toggle";
import { useCallback } from "react";
import { Pressable } from "react-native";
import { Drawer } from "expo-router/drawer";
import { useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const DrawerLayout = () => {
  // useCallback 避免每次渲染都创建新函数，防止 header 不必要的重渲染
  const renderThemeToggle = useCallback(() => <ThemeToggle />, []);

  // 从主题系统获取前景色（文字/图标颜色）
  const themeColorForeground = useThemeColor("foreground");
  // 从主题系统获取背景色
  const themeColorBackground = useThemeColor("background");

  return (
    <Drawer
      screenOptions={{
        // 隐藏默认 header，让每个 Drawer.Screen 自己控制是否显示
        headerShown: false,

        // header 左侧返回按钮和图标的颜色
        headerTintColor: themeColorForeground,

        // header 整体背景色
        headerStyle: {
          backgroundColor: themeColorBackground,
        },

        // header 标题的文字样式
        headerTitleStyle: {
          fontWeight: "600",
          color: themeColorForeground,
        },

        // header 右侧默认渲染主题切换按钮（可被子 Screen 覆盖）
        headerRight: renderThemeToggle,

        // 抽屉面板本身的背景色
        drawerStyle: {
          backgroundColor: themeColorBackground,
        },
      }}
    >
      <Drawer.Screen
        // 对应 app/(tabs) 文件夹，整个 Tab 导航作为抽屉的一个入口
        name="(tabs)"
        options={{
          // 抽屉展开时该项显示的标题文字
          headerTitle: "Tabs",

          // 抽屉菜单列表中该项左侧的图标
          drawerIcon({ size, color }) {
            return <Ionicons name="grid-outline" size={size} color={color} />;
          },

          // 覆盖 screenOptions 中的全局 headerRight
          // 在 (tabs) 页面右上角显示 + 按钮，点击打开 modal 路由
          headerRight: () => (
            <Link href="/modal" asChild>
              {/* asChild 让 Link 的点击事件代理给子组件 Pressable */}
              <Pressable className="mr-4">
                <Ionicons
                  name="add-outline"
                  size={24}
                  color={themeColorForeground}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
