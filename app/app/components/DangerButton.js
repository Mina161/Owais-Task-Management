import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import globalStyles from "./Styles";

export const SecondaryButton = ({ text, onPress, disabled, style, icon, smallFactor, fullWidth }) => {

  return (
    <Button mode="outlined" icon={icon} style={{...globalStyles.button, width: smallFactor ? "" : fullWidth ? "100%" : "50%", borderColor: "#FF0000", ...style}} labelStyle={{ margin: smallFactor ? 0 : 10, fontSize: 16, color: "#FF0000" }} onPress={onPress} disabled={disabled}>
      {text}
    </Button>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryButton);
