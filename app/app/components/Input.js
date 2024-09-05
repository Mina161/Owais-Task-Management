import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import globalStyles from "./Styles";

export const Input = ({ label, placeholder, value, onChangeText, secureTextEntry, icon, iconOnPress, inputMode, readOnly, style, outlineStyle, returnKeyType, onSubmitEditing }) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry)

  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      value={value}
      inputMode={inputMode}
      editable={!readOnly}
      disabled={readOnly}
      secureTextEntry={hidePassword}
      left={icon ? <TextInput.Icon icon={icon} onPress={iconOnPress} /> : null}
      right={secureTextEntry ? (hidePassword ? <TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} /> : <TextInput.Icon icon="eye-off" onPress={() => setHidePassword(!hidePassword)} />) : null}
      style={{ ...globalStyles.input, ...style }}
      outlineStyle={{...outlineStyle}}
      activeOutlineColor="#E0E0E0"
      onChangeText={onChangeText}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
