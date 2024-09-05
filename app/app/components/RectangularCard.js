import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image } from "react-native";
import { customText, Card, Avatar } from "react-native-paper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
const Text = customText("bold");

export const RectangularCard = ({ title, subtitle, left, right, navigate }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
    <Card mode="outlined" style={{width: "100%", height: width/4, marginVertical: 10, borderColor: "#C7C5D0"}} onPress={navigate}>
      <Card.Content>
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          {left && <View>
            <Avatar.Icon style={{width: width/7, height: width/7}} color="white" icon={"exclamation"} />
          </View>}
          <View style={{width: (4*width)/6}}>
            <Text variant="bold" style={{fontSize: 16}}>{title}</Text>
            <Text style={{fontSize: 14}}>{subtitle}</Text>
          </View>
          {right && <View>
            {Platform.OS !== "web" && <Image style={{width: width/6, height: width/6}} src={right} resizeMode={"center"} />}
            {Platform.OS === "web" && <Image style={{width: width/6, height: width/6}} source={right} resizeMode={"center"}/>}
          </View>}
        </View>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RectangularCard);
