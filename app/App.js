import { Provider } from "react-redux";
import store from "./app/store/store";
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import Router from "./Router";
import { schedulePushNotification } from "./app/components/Notifications";

SplashScreen.preventAutoHideAsync();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
