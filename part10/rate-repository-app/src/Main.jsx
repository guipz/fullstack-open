import RepositoryList from "./components/RepositoryList";
import RepositoryView from "./components/RepositoryView";
import SignIn from "./components/SignIn";
import AppBar from "./components/AppBar";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "./Theme";
import { Navigate, Route, Routes, useNavigate } from "react-router-native";
import Text from "./components/Text";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "./graphql/queries";
import { useAuthStorage } from "./context/AuthStorageContext";
import Review from "./components/Review";
import SignUp from "./components/SignUp";
import MyReviews from "./components/MyReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});

const Main = () => {
  const navigate = useNavigate();
  const meQuery = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const SignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const me = meQuery.data?.me ?? null;

  return (
    <View style={styles.container}>
      <AppBar>
        <Pressable onPress={() => navigate("/")}>
          <Text
            color={"textOnSecondary"}
            fontWeight={"bold"}
            fontSize={"subheading"}
          >
            Repositories
          </Text>
        </Pressable>
        {!meQuery.loading &&
          !meQuery.error &&
          (!me ? (
            <>
              <Pressable onPress={() => navigate("/signin")}>
                <Text
                  color={"textOnSecondary"}
                  fontWeight={"bold"}
                  fontSize={"subheading"}
                >
                  Sign-in
                </Text>
              </Pressable>
              <Pressable onPress={() => navigate("/signup")}>
                <Text
                  color={"textOnSecondary"}
                  fontWeight={"bold"}
                  fontSize={"subheading"}
                >
                  Sign-up
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable onPress={() => navigate("/review")}>
                <Text
                  color={"textOnSecondary"}
                  fontWeight={"bold"}
                  fontSize={"subheading"}
                >
                  Create a review
                </Text>
              </Pressable>
              <Pressable onPress={() => navigate("/my-reviews")}>
                <Text
                  color={"textOnSecondary"}
                  fontWeight={"bold"}
                  fontSize={"subheading"}
                >
                  My reviews
                </Text>
              </Pressable>
              <Pressable onPress={SignOut}>
                <Text
                  color={"textOnSecondary"}
                  fontWeight={"bold"}
                  fontSize={"subheading"}
                >
                  Sign-out
                </Text>
              </Pressable>
            </>
          ))}
      </AppBar>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<RepositoryView />} />
        <Route path="/review" element={<Review />} />
        <Route path="/my-reviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
