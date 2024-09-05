import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import globalStyles from "./Styles";
import Timeline from 'react-native-timeline-flatlist'

export const Steps = ({ steps }) => {

  return (
    <Timeline
        data={steps.map((step) => { return {...step, icon: <Avatar.Icon style={{backgroundColor: "#E5F8FF"}} color="#1E5154" size={30} icon={step.icon}/>} })}
        circleStyle={{marginTop: 7}}
        
        innerCircle={'icon'}
        showTime={false}
        titleStyle={{fontFamily: "SpaceGrotesk", fontWeight: "700"}}
        descriptionStyle={{fontFamily: "SpaceGrotesk"}}
        eventContainerStyle={{borderStyle: Platform.OS === "ios" ? "solid" : "dashed"}}
        dotSize={0}
        lineColor="#1E5154"
        circleColor="#E5F8FF"
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Steps);
