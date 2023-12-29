import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORIES } from "../graphql/queries";
import { Picker } from "@react-native-picker/picker";
import TextInput from "./TextInput";

import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import theme from "../Theme";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerPromptHeader: {
    color: theme.colors.textSecondary,
  },
  searchInput: {
    margin: 10
  }
});

const orderingValues = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  }
}

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  query: { data },
  orderingValues,
  onOrderingValueChange,
  orderingValue,
  onSearchKeywordChange,
  searchKeyword,
}) => {
  const repositories = data ? data.repositories.edges.map((r) => r.node) : [];
  const navigate = useNavigate();

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <View>
          <TextInput
            style={styles.searchInput}
            value={searchKeyword}
            onChangeText={(e) => onSearchKeywordChange(e)}
            placeholder="Search repository"
          />
          <Picker
            selectedValue={orderingValue}
            onValueChange={onOrderingValueChange}
          >
            <Picker.Item
              enabled={false}
              style={styles.pickerPromptHeader}
              label="Select an item..."
            />
            <Picker.Item label="Latest repositories" value={orderingValues.latest} />
            <Picker.Item label="Highest rated repositories" value={orderingValues.highest} />
            <Picker.Item label="Lowest rated repositories" value={orderingValues.lowest} />
          </Picker>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [orderVariables, setOrderVariables] = useState(orderingValues.latest);
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

  const query = useQuery(GET_REPOSITORIES, {
    variables: { ...orderVariables, searchKeyword: debouncedSearchKeyword },
  });

  return (
    <RepositoryListContainer
      query={query}
      orderingValues={orderingValues}
      orderingValue={orderVariables}
      onOrderingValueChange={setOrderVariables}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={setSearchKeyword}
    />
  );
};

export default RepositoryList;
