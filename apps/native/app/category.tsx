import CategoryTemplate from "@/components/templates/category-template";
import { categoriesQueryOptions } from "@/hooks/use-categories";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "heroui-native";
import { Suspense } from "react";
import { View } from "react-native";
const Category = () => {
  const queryClient = useQueryClient();
  void queryClient.prefetchQuery(categoriesQueryOptions());

  return (
    <Suspense
      fallback={
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" color="success" />
        </View>
      }
    >
      <CategoryTemplate />
    </Suspense>
  );
};
export default Category;
