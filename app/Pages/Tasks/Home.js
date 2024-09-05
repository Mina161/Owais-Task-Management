import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, Image, Dimensions } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Text,
  Appbar,
  TextInput,
  ActivityIndicator
} from "react-native-paper";
import {
  Input,
  PrimaryButton,
  Page,
  globalStyles,
  SecondaryButton,
  AppBar,
  LoaderPage,
  Dialog
} from "../../app/components";
import { logout } from "../../app/store/actions/authActions";
import DangerButton from "../../app/components/DangerButton";

export const TasksHome = ({ user, logout, isLoading }) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "white", flex: 1, justifyContent: "space-between" }}>
      <View/>
      <View style={{ padding: 15 }}>
        <View style={{ marginTop: 20 }}>
          <Text variant="medium" style={{fontSize: 48 }}>Welcome</Text>
          <Text variant="medium" style={{fontSize: 48, color: "#D49600"}}>{user?.name}</Text>
        </View>
        <View style={{ ...globalStyles.container, marginVertical: 20 }}>
          <DangerButton fullWidth onPress={() => logout()} text={"Logout"} />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  isLoading: state?.records?.isLoading
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(TasksHome);
