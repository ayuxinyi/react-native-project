import { ThemeToggle } from "@/components/theme-toggle";
import { useCallback } from "react";
import { Pressable } from "react-native";
import { Drawer } from "expo-router/drawer";
import { useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const DrawerLayout = () => {
  const renderThemeToggle = useCallback(() => <ThemeToggle />, []);

  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        headerTintColor: themeColorForeground,
        headerStyle: {
          backgroundColor: themeColorBackground,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: themeColorForeground,
        },
        headerRight: renderThemeToggle,
        drawerStyle: {
          backgroundColor: themeColorBackground,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: "Tabs",
          drawerIcon({ size, color }) {
            return <Ionicons name="grid-outline" size={size} color={color} />;
          },
          headerRight: () => (
            <Link href="/modal" asChild>
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
      ></Drawer.Screen>
    </Drawer>
  );
};
export default DrawerLayout;
