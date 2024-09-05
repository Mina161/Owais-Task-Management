import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from "../Pages";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { WebViewPage } from "../app/components";

const Stack = createStackNavigator();

export default function TasksRouter({ jumpTo }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
