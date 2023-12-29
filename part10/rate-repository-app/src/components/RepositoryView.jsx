import { useQuery } from "@apollo/client";
import { GET_REPOSITORY, GET_REVIEWS } from "../graphql/queries";
import RepositoryItem from "../components/RepositoryItem";
import { useParams } from "react-router-native";
import RepositoryReviewList from "./RepositoryReviewList";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RepositoryView = () => {
  const id = useParams("/:id").id;
  const repositoriesQuery = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });
  const reviewsQuery = useQuery(GET_REVIEWS, { variables: { id: id } });
  let reviews = reviewsQuery.data
    ? reviewsQuery.data.repository.reviews.edges.map((r) => r.node)
    : [];
  reviews = reviews.map((r) => ({
    createdAt: r.createdAt,
    rating: r.rating,
    title: r.user.username,
    content: r.text,
  }));

  if (repositoriesQuery.data && reviewsQuery.data) {
    return (
      <View style={styles.container}>
        <RepositoryItem
          item={repositoriesQuery.data.repository}
          showOpenGitHubButton
        />
        <RepositoryReviewList reviews={reviews} showInitialItemSeparator />
      </View>
    );
  }
};

export default RepositoryView;
