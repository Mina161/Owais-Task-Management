import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Task, TasksHome } from "../Pages";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import WebViewPage from "../app/components/WebViewPage";

const Stack = createStackNavigator();

export default function TasksRouter({ jumpTo }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={TasksHome} />
        <Stack.Screen name="Task" options={{ headerShown: false }} component={Task} />
        <Stack.Screen name="Attachment" options={{ headerShown: false }} component={WebViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
