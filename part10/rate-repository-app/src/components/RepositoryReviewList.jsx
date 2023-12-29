import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native";
import RepositoryReviewItem from "./RepositoryReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryReviewList = ({ query: { data } }) => {
  const repositories = data ? data.repository.reviews.edges.map((r) => r.node) : [];

  return (
    <FlatList
      ListHeaderComponent={<ItemSeparator/>}
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryReviewItem item={item} />}
    />
  );
};

export default RepositoryReviewList;
