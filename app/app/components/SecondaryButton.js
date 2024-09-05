import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import globalStyles from "./Styles";

export const SecondaryButton = ({ text, onPress, disabled, style, icon, smallFactor, fullWidth }) => {

  return (
    <Button mode="text" icon={icon} style={{...globalStyles.button, marginVertical: smallFactor ? 0 : null, width: smallFactor ? "" : fullWidth ? "100%" : "50%", ...style}} labelStyle={{ margin: smallFactor ? 0 : 10, fontSize: 16 }} textColor="#202B30" onPress={onPress} disabled={disabled}>
      <Text variant="medium" style={{color: "#202B30"}}>{text}</Text>
    </Button>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryButton);
