import RepositoryList from "./components/RepositoryList";
import SignIn from "./components/SignIn";
import AppBar from "./components/AppBar";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "./Theme";
import { Navigate, Route, Routes, useNavigate } from "react-router-native";
import Text from "./components/Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
});

const Main = () => {
  const navigate = useNavigate();

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
        <Pressable onPress={() => navigate("/signin")}>
          <Text
            color={"textOnSecondary"}
            fontSize={"subheading"}
          >
            Sign-in
          </Text>
        </Pressable>
      </AppBar>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
