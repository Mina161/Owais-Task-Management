import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import globalStyles from "./Styles";

export const LoaderPage = ({ }) => {

  return (
    <View style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator color="#1E5154" size="large"/>
    </View>
  );
};

export default LoaderPage;
