import { useLayout } from "@/hooks/use-layout";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SuccessModal({ visible, onClose }: SuccessModalProps) {
  const insets = useSafeAreaInsets();

  const { modalWidth } = useLayout();

  const handleGoToDashboard = () => {
    onClose();
    router.replace("/(drawer)/(tabs)");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 8,
        }}
      >
        <View
          style={{
            width: modalWidth,
            backgroundColor: "#0F2925", // Dark green background from design
            borderRadius: 40,
            paddingHorizontal: 32,
            paddingTop: 40,
            paddingBottom: 32,
            gap: 40,
            alignItems: "center",
          }}
        >
          <View className="items-center gap-6">
            <View className="w-25 h-25 rounded-full items-center justify-center border-[3px] border-[#FFFFFF]/20">
              <Ionicons name="checkmark-outline" size={48} color="#FFFFFF" />
            </View>

            <View className="items-center gap-3 px-2">
              <Text className="text-h2 leading-8.25 text-center text-white font-bold">
                设置完成，开始跟踪你的财务吧！
              </Text>
              <Text className="text-body-sm leading-4.5 text-center text-white/70 font-sans">
                设置完成，你可以在控制台中开始跟踪你的财务了！
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleGoToDashboard}
            className="h-14 w-full rounded-full items-center justify-center bg-[#1C3E38]"
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            <Text className="text-body-lg  text-white font-bold">
              前往控制台
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
