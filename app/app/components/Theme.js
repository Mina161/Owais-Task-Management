import { Provider as PaperProvider, DefaultTheme, configureFonts } from "react-native-paper";

// const fontConfig = {
//   fontFamily: "SpaceGrotesk"
// };

const theme = {
  ...DefaultTheme,
  // fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E5154",
    onPrimary: "#E5F8FF",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    onSurface: "#202B30",
    secondaryContainer: "#F12067",
    onSecondaryContainer: "#E5F8FF",
    surfaceVariant: "#E5F8FF",
    elevation: {
      ...DefaultTheme.colors.elevation,
      level2: "#FFFFFF"
    }
  }
};

export default theme;
