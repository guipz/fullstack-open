import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native";
import RepositoryReviewItem from "./RepositoryReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryReviewList = ({ reviews, showInitialItemSeparator }) => {

  return (
    <FlatList
      ListHeaderComponent={ showInitialItemSeparator && <ItemSeparator />}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryReviewItem item={item} />}
    />
  );
};

export default RepositoryReviewList;
