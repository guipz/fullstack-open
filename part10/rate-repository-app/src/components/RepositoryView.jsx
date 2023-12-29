import { useQuery } from "@apollo/client";
import { GET_REPOSITORY, GET_REVIEWS } from "../graphql/queries";
import RepositoryItem from "../components/RepositoryItem";
import { useParams } from "react-router-native";
import RepositoryReviewList from "./RepositoryReviewList";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const RepositoryView = () => {
  const id = useParams("/:id").id;
  const repositoriesQuery = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });
  const reviewsQuery = useQuery(GET_REVIEWS, { variables: { id: id } });

  if (repositoriesQuery.data && reviewsQuery.data) {
    return (
      <View style={styles.container}>
        <RepositoryItem
          item={repositoriesQuery.data.repository}
          showOpenGitHubButton
        />
        <RepositoryReviewList
          query={reviewsQuery}
        />
      </View>
    );
  }
};

export default RepositoryView;
