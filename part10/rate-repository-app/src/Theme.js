import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textOnPrimary: "#ffffff",
    textSecondary: "#586069",
    textOnSecondary: "#ffffff",
    outlineSurface: "#a6a6a6",
    background: "#e1e4e8",
    danger: "red",
    surface: "#ffffff",
    secondary: "#24292e",
    primary: "#0366d6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System"
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
