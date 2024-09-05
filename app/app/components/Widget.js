import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import { customText, Card } from "react-native-paper";
const Text = customText("bold");

export const Widget = ({ title, image, icon, navigateTo, navigateObj, color }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
    <Card mode="contained" style={{display: "flex", justifyContent: "center", alignItems: "center", width: width/3 - 20, height: width/3 - 20, margin: 5}} onPress={() => navigation.navigate(navigateTo, navigateObj)}>
      <View style={{display: "flex", justifyContent: "center", alignItems: "center", flex:1, padding: 5, width: "100%", height: "100%"}}>
        {image && <Image style={{width: 60, height: 60}} source={image}/>}
        {icon && Platform.OS === "web" && <Image style={{width: 60, height: 60}} source={icon}/>}
        {icon && Platform.OS !== "web" && <Image style={{width: 60, height: 60}} src={icon}/>}
        <Text variant="bold" style={{ fontSize: 12, textAlign: "center"}}>{title}</Text>
      </View>
    </Card>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
