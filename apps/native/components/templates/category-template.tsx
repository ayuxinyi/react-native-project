import {
  categoriesQueryOptions,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/hooks/use-categories";
import { useSuspenseQuery } from "@tanstack/react-query";
import { View, Text, Pressable, FlatList } from "react-native";
import Container from "../ui/common/container";
import { useState } from "react";
import CashoryScreenHeader from "../base/reports/cashory-screen-header";
import { Ionicons } from "@expo/vector-icons";
import useAuthTheme from "@/hooks/use-auth-theme";
import CategoryItem from "../containers/category/category-item";
import { Button, Dialog } from "heroui-native";
import { CashoryButton } from "../ui/common/cashory-button";
import AddCategoryDialog from "../containers/category/add-category-dialog";

const CategoryTemplate = () => {
  const { isDark } = useAuthTheme();
  const { data: categoriesData } = useSuspenseQuery({
    ...categoriesQueryOptions(),
  });
  const updateCategory = useUpdateCategoryMutation();
  const deleteCategory = useDeleteCategoryMutation();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteCategoryId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (deleteCategoryId) {
      deleteCategory.mutate(deleteCategoryId);
      setIsDeleteModalVisible(false);
      setDeleteCategoryId(null);
    }
  };

  const iconColor = isDark ? "#ffffff" : "#000000";

  return (
    <>
      <Container
        isScrollable={false}
        className="flex-1 bg-brand-white dark:bg-brand-green-900 p-4"
      >
        <View className="px-5 w-full flex-1">
          <CashoryScreenHeader
            title="分类列表"
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
            {categoriesData.length === 0 ? (
              <Text className="text-center text-foreground mt-10 font-medium">
                暂无相关分类，创建一个吧。
              </Text>
            ) : (
              <FlatList
                data={categoriesData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <CategoryItem item={item} onDelete={handleDelete} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            )}
          </View>
        </View>
      </Container>
      <AddCategoryDialog
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
            <Dialog.Title>删除分类</Dialog.Title>
            <Dialog.Description>
              确定删除分类吗？删除后将无法恢复。
            </Dialog.Description>
            <View className="flex-row items-center justify-end gap-3 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => {
                  setIsDeleteModalVisible(false);
                  setDeleteCategoryId(null);
                }}
              >
                取消
              </Button>
              <CashoryButton
                variant="solid"
                color="danger"
                size="sm"
                onPress={confirmDelete}
                isLoading={deleteCategory.isPending}
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
export default CategoryTemplate;
