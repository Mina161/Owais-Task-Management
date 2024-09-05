import { connect } from "react-redux";
import { loadUser } from "./app/store/actions/authActions";
import { Provider as PaperProvider, configureFonts } from "react-native-paper";
import { useEffect } from "react";
import { LoginRouter, TasksRouter } from "./Routers";
import { schedulePushNotification } from "./app/components/Notifications";
import { theme } from "./app/components";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

export const Router = ({ user, loadUser }) => {
    const [fontsLoaded, fontError] = Font.useFonts({
        'Montserrat': require("./assets/fonts/Montserrat-Regular.ttf"),
        'Montserrat-Medium': require("./assets/fonts/Montserrat-Medium.ttf"),
        'Montserrat-Bold': require("./assets/fonts/Montserrat-Bold.ttf"),
        "material-community": require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")
    });

    useEffect(() => {
        loadUser({})
    }, [])

    useEffect(() => {
        console.log({ fontError, fontsLoaded })
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontError, fontsLoaded])

    const fontConfig = {
        default: {
            fontFamily: "Montserrat"
        },
        medium: {
            fontFamily: "Montserrat-Medium"
        },
        bold: {
            fontFamily: "Montserrat-Bold"
        }
    }

    const themeWithFont = theme

    if (fontsLoaded) {
        themeWithFont.fonts = configureFonts({ config: fontConfig });

        if (user) {
            return (
                <PaperProvider theme={themeWithFont}>
                    <TasksRouter />
                </PaperProvider>
            )
        } else {
            return (
                <PaperProvider theme={themeWithFont}>
                    <LoginRouter />
                </PaperProvider>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    user: state?.auth?.user,
    isLoading: state?.auth?.isLoading || state?.records?.isLoading,
});

const mapDispatchToProps = { loadUser };

export default connect(mapStateToProps, mapDispatchToProps)(Router);
