import { View, Text, Pressable, FlatList } from "react-native";
import Container from "../ui/common/container";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  queryWalletOptions,
  useDeleteWalletMutation,
} from "@/hooks/use-wallet";
import { Button, Dialog, useThemeColor } from "heroui-native";
import CashoryScreenHeader from "../base/reports/cashory-screen-header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CashoryButton } from "../ui/common/cashory-button";
import { WalletCard } from "../containers/wallet/wallet-card";
import { AddWalletDialog } from "../containers/wallet/add-wallwt-dialog";
const WalletTemplate = () => {
  const { data: walletData } = useSuspenseQuery(queryWalletOptions());
  const deleteWallet = useDeleteWalletMutation();
  const iconColor = useThemeColor("foreground");

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteWalletId, setDeleteWalletId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!deleteWalletId) {
      return;
    }
    await deleteWallet.mutateAsync(deleteWalletId);
    setIsDeleteModalVisible(false);
    setDeleteWalletId(null);
  };

  const handleDelete = (id: string) => {
    setDeleteWalletId(id);
    setIsDeleteModalVisible(true);
  };

  return (
    <>
      <Container
        isScrollable={false}
        className="flex-1 bg-brand-white dark:bg-brand-green-900"
      >
        <View className="px-5 w-full flex-1">
          <CashoryScreenHeader
            title="钱包列表"
            showBack
            rightElement={
              <Pressable
                className="size-12.5 rounded-[40px]"
                onPress={() => setIsAddModalVisible(true)}
                accessibilityRole="button"
                accessibilityLabel="添加分类"
              >
                <Ionicons name="add" size={24} color={iconColor} />
              </Pressable>
            }
          />
          <View className="px-5 pt-2 flex-1">
            <FlatList
              data={walletData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <WalletCard wallet={item} onDelete={handleDelete} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Text className="text-center text-foreground mt-10 font-medium">
                  暂无相关钱包，创建一个吧。
                </Text>
              )}
            />
          </View>
        </View>
      </Container>
      <AddWalletDialog
        isOpen={isAddModalVisible}
        onOpenChange={setIsAddModalVisible}
      />
      <Dialog
        isOpen={isDeleteModalVisible}
        onOpenChange={setIsDeleteModalVisible}
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>删除钱包</Dialog.Title>
            <Dialog.Description>
              确认删除钱包吗？删除后将无法恢复。
            </Dialog.Description>
            <View className="flex-row items-center justify-end gap-3 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => {
                  setIsDeleteModalVisible(false);
                  setDeleteWalletId(null);
                }}
              >
                取消
              </Button>
              <CashoryButton
                variant="solid"
                color="danger"
                size="sm"
                onPress={confirmDelete}
                isLoading={deleteWallet.isPending}
              >
                删除
              </CashoryButton>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
};
export default WalletTemplate;
