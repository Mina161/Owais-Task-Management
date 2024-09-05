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
import { loadUser, logIn } from "../../app/store/actions/authActions";

export const Login = ({ logIn, isLoading, authErrorMessage, isError }) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "white", flex: 1, justifyContent: "space-between" }}>
      <View/>
      <View style={{ padding: 15 }}>
        <View style={{ marginTop: 20 }}>
          <Text variant="medium" style={{fontSize: 48 }}>MANAGE YOUR TASKS WITH</Text>
          <Text variant="medium" style={{fontSize: 48, color: "#D49600"}}>OWITASKS</Text>
        </View>
        <View style={{ ...globalStyles.container, marginVertical: 20 }}>
          <PrimaryButton fullWidth onPress={() => navigation.navigate("Login")} text={"Let's Start"} />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  authErrorMessage: state?.auth?.errorMessage,
  isError: state?.auth?.isError,
  isLoading: state?.auth?.isLoading
});

const mapDispatchToProps = { logIn };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
