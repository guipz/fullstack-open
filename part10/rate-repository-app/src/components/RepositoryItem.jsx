import { Image, StyleSheet } from "react-native";
import theme from "../Theme";
import Text from "./Text";

const { View } = require("react-native");

const style = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 15,
    padding: 15,
  },
  headerInfo: {
    flexWrap: "wrap",
    rowGap: 5,
    alignItems: "flex-start",
  },
  stats: {
    flexDirection: "row",
    columnGap: 15,
    paddingBottom: 15,
    paddingHorizontal: 15
  },
  stat: {
    flexGrow: 1,
    textAlign: "center",
    alignItems: "center",
  },
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={style.container}>
      <RepositoryItemHeader item={item} />
      <RepositoryItemStats item={item} />
    </View>
  );
};

const RepositoryItemStat = ({ name, value }) => {
  let formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (formatted.length >= 4) {
    formatted = `${formatted.substring(0, formatted.length - 2)}k`;
  }
  return (
    <View style={style.stat}>
      <Text fontWeight={"bold"}>{formatted}</Text>
      <Text color="textSecondary">{name}</Text>
    </View>
  );
};

const RepositoryItemStats = ({ item }) => {
  return (
    <View style={style.stats}>
      <RepositoryItemStat name={"Stars"} value={item.stargazersCount} />
      <RepositoryItemStat name={"Forks"} value={item.forksCount} />
      <RepositoryItemStat name={"Reviews"} value={item.reviewCount} />
      <RepositoryItemStat name={"Rating"} value={item.ratingAverage} />
    </View>
  );
};

const RepositoryItemHeader = ({ item }) => {
  return (
    <View style={style.header}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={style.avatar} />
      <View style={style.headerInfo}>
        <Text fontWeight={"bold"}>{item.fullName}</Text>
        <Text color={"textSecondary"}>{item.description}</Text>
        <Text color={"textOnPrimary"} style={style.badge}>
          {item.language}
        </Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
