import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../Theme";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.outlineSurface,
    borderRadius: 3,
    padding: 10,
  },
  danger: {
    borderColor: theme.colors.danger
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.container, error && styles.danger];
  return (
    <NativeTextInput
      cursorColor={theme.colors.primary}
      style={textInputStyle}
      error={error}
      {...props}
    />
  );
};

export default TextInput;
