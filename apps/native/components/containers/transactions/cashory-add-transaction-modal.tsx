import { CashoryButton } from "@/components/ui/common/cashory-button";
import { GeneralArrowUpLe } from "@/components/ui/icon/GeneralArrowUpLe";
import { GeneralArrowUpRi } from "@/components/ui/icon/GeneralArrowUpRi";
import { GeneralEdit } from "@/components/ui/icon/GeneralEdit";
import { useRouter } from "expo-router";
import { BottomSheet, RadioGroup, Radio } from "heroui-native";
import { FC, useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

type TransactionType = "income" | "expense";

interface CashoryAddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (type: TransactionType) => void;
}

const StyledGeneralEdit = withUniwind(GeneralEdit);
const StyleGeneralArrowUpRi = withUniwind(GeneralArrowUpRi);
const StyleGeneralArrowUpLe = withUniwind(GeneralArrowUpLe);

const CashoryAddTransactionModal: FC<CashoryAddTransactionModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<TransactionType>("income");

  const handleConfirm = () => {
    onClose();
    onConfirm(selectedType);
  };

  return (
    <BottomSheet isOpen={visible} onOpenChange={open => !open && onClose()}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content
          snapPoints={["80%"]}
          enablePanDownToClose={true}
          backgroundClassName="bg-brand-white dark:bg-dark-green rounded-t-[40px]"
          className="px-6 pt-12"
          style={{
            paddingBottom: Math.max(insets.bottom + 20, 34),
          }}
        >
          <View className="flex-row items-center gap-x-2.5 mb-6">
            <View className="size-12.5 rounded-[40px] items-center justify-center bg-brand-flashwhite dark:bg-dark-charcoal-green">
              <StyledGeneralEdit
                className="text-brand-black dark:text-brand-white"
                width={24}
                height={24}
              />
            </View>
            <BottomSheet.Title className="text-h3 leading-7.5 font-bold text-brand-black dark:text-brand-white">
              添加交易
            </BottomSheet.Title>
            <RadioGroup
              value={selectedType}
              onValueChange={val => setSelectedType(val as TransactionType)}
            >
              <RadioGroup.Item
                value="income"
                className="flex-row items-center justify-between w-full bg-brand-flashwhite dark:bg-dark-charcoal-green rounded-[30px] p-4"
                style={{
                  shadowColor: "rgba(139, 138, 138, 0.12)",
                  shadowOffset: { width: -1, height: -5 },
                  shadowOpacity: 1,
                  shadowRadius: 61,
                  elevation: 4,
                }}
              >
                <View className="flex-row items-center gap-x-2.5">
                  <View className="w-12.5 h-12.5 rounded-[40px] items-center justify-center bg-brand-white dark:bg-dark-green">
                    <StyleGeneralArrowUpRi
                      className="text-foreground"
                      width={24}
                      height={24}
                    />
                  </View>
                  <Text
                    className="text-[16px] leading-5 font-bold text-brand-black dark:text-brand-white"
                    style={{ fontFamily: "PlusJakartaSans_700Bold" }}
                  >
                    增加收入
                  </Text>
                </View>
                <Radio />
              </RadioGroup.Item>

              <RadioGroup.Item
                value="expense"
                className="flex-row items-center justify-between w-full bg-brand-flashwhite dark:bg-dark-charcoal-green rounded-[30px] p-4"
                style={{
                  shadowColor: "rgba(139, 138, 138, 0.12)",
                  shadowOffset: { width: -1, height: -5 },
                  shadowOpacity: 1,
                  shadowRadius: 61,
                  elevation: 4,
                }}
              >
                <View className="flex-row items-center gap-x-2.5">
                  <View className="w-12.5 h-12.5 rounded-[40px] items-center justify-center bg-brand-white dark:bg-dark-green">
                    <StyleGeneralArrowUpLe
                      className="text-foreground"
                      width={24}
                      height={24}
                    />
                  </View>
                  <Text
                    className="text-[16px] leading-5 font-bold text-brand-black dark:text-brand-white"
                    style={{ fontFamily: "PlusJakartaSans_700Bold" }}
                  >
                    增加支出
                  </Text>
                </View>
                <Radio />
              </RadioGroup.Item>
            </RadioGroup>
            <View className="gap-y-4 pb-6">
              <CashoryButton
                onPress={handleConfirm}
                className="bg-brand-green-500 dark:bg-dark-charcoal-green"
              >
                立即添加
              </CashoryButton>
            </View>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};
export default CashoryAddTransactionModal;
