import { useQuery } from "@apollo/client";
import RepositoryReviewList from "./RepositoryReviewList";
import { StyleSheet, View } from "react-native";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MyReviews = () => {
  const reviewsQuery = useQuery(ME, { variables: { includeReviews: true } });
  let reviews = reviewsQuery.data
    ? reviewsQuery.data.me.reviews.edges.map((r) => r.node)
    : [];
  reviews = reviews.map((r) => ({
    createdAt: r.createdAt,
    rating: r.rating,
    title: r.repository.name,
    content: r.text,
  }));

  if (reviewsQuery.data) {
    return (
      <View style={styles.container}>
        <RepositoryReviewList reviews={reviews} />
      </View>
    );
  }
};

export default MyReviews;
