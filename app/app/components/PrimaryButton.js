import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import globalStyles from "./Styles";

export const PrimaryButton = ({ text, onPress, disabled, style, icon, smallFactor, fullWidth }) => {

  return (
    <Button mode="contained" icon={icon} style={{ ...globalStyles.button, marginVertical: smallFactor ? 0 : null, width: smallFactor ? "" : fullWidth ? "100%" : "50%", ...style }} labelStyle={{ margin: smallFactor ? 0 : 10, fontSize: 16 }} buttonColor="#1E5154" onPress={onPress} disabled={disabled}>
      <Text variant="medium" style={{color: "white"}}>{text}</Text>
    </Button>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);
