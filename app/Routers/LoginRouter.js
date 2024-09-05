import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, SignUp } from "../Pages";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function LoginRouter({ jumpTo }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
