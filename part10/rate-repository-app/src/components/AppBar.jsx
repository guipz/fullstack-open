import { View, StyleSheet } from "react-native";
import theme from "../Theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
    columnGap: 10
  },
});

const AppBar = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default AppBar;
