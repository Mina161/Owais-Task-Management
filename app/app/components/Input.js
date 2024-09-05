import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import globalStyles from "./Styles";

export const Input = ({ label, placeholder, value, onChangeText, secureTextEntry, inputMode, readOnly }) => {

  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      value={value}
      inputMode={inputMode}
      editable={!readOnly}
      disabled={readOnly}
      secureTextEntry={secureTextEntry}
      style={{ ...globalStyles.input }}
      activeOutlineColor="#1E5154"
      onChangeText={onChangeText}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
