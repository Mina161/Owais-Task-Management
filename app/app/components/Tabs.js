import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { Button, customText } from "react-native-paper";
import globalStyles from "./Styles";
const Text = customText("bold");

export const Tabs = ({ tabData, onChange }) => {

  const [currentTab, setCurrentTab] = useState(Object.keys(tabData)[0])
  const handleTabChange = (tabTitle) => {
    if(currentTab !== tabTitle) {
      setCurrentTab(tabTitle)
      onChange && onChange(tabTitle)
    }
  }

  return (
    <View>
      <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
        {Object.keys(tabData).map((tabTitle) => {return (
          <Button mode="contained" buttonColor={currentTab === tabTitle ? "#1E5154" : "#FFFFFF"} onPress={() => handleTabChange(tabTitle)}>
            <Text variant="bold" style={{color: currentTab === tabTitle ? "#FFFFFF" :  "#1E5154"}}>{tabTitle}</Text>
          </Button>
        )})}
      </View>
      {tabData[currentTab]}
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
