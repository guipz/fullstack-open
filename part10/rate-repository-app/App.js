import { StatusBar, StyleSheet, View } from "react-native";
import Main from "./src/Main";
import { NativeRouter } from "react-router-native";
import createApolloClient from "./src/utils/createApolloClient";
import { ApolloProvider } from "@apollo/client";
import AuthStorageContext from "./src/context/AuthStorageContext";
import AuthStorage from "./src/utils/authStorage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <AuthStorageContext.Provider value={authStorage}>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <View style={styles.container}>
            <Main />
            <StatusBar style="auto" />
          </View>
        </ApolloProvider>
      </NativeRouter>
    </AuthStorageContext.Provider>
  );
}
