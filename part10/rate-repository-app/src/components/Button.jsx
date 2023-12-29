import { Pressable, StyleSheet } from "react-native";
import theme from "../Theme";
import Text from "./Text";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    textAlign: "center",
  },
});

const Button = ({ onPress, text, fontSize, style, pressableProps }) => {
  return (
    <Pressable onPress={onPress} {...pressableProps} hitSlop={10}>
      <Text
        color={"textOnPrimary"}
        fontWeight={"bold"}
        fontSize={fontSize}
        style={{...styles.button, ...style}}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
