import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image } from "react-native";
import { Text, Snackbar } from "react-native-paper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import SecondaryButton from "./SecondaryButton";

export const SnackBar = ({ visible, onDismiss, text }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
    <Snackbar visible={visible} onDismiss={onDismiss}>
      <Text>{text}</Text>
    </Snackbar>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
