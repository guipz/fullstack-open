import { StyleSheet } from "react-native";
import Text from "./Text";
import { View } from "react-native";
import theme from "../Theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 15,
    padding: 10,
    backgroundColor: theme.colors.surface,
  },
  info: {
    flexWrap: "wrap",
    flex: -1,
    rowGap: 2,
    alignItems: "flex-start",
  },
  rating: {
    height: 40,
    width: 40,
    textAlignVertical: "center",
    textAlign: "center",
    borderRadius: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
});

const RepositoryReviewItem = ({ item }) => {
  const date = new Date(item.createdAt).toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text fontWeight={"bold"} style={styles.rating} color={"primary"}>
        {item.rating}
      </Text>
      <View style={styles.info}>
        <Text fontWeight={"bold"}>{item.user.username}</Text>
        <Text color={"textSecondary"}>{date}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

export default RepositoryReviewItem;
