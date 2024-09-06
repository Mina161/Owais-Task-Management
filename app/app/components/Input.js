import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import globalStyles from "./Styles";
import { DatePickerInput } from 'react-native-paper-dates';

export const Input = ({ label, placeholder, required, value, onChangeText, secureTextEntry, icon, iconOnPress, inputMode, readOnly, style, outlineStyle, returnKeyType, onSubmitEditing, multiline }) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry)

  return (
    inputMode === "date" ? (
      <DatePickerInput
        mode="outlined"
        locale="en"
        label={`${label}${required ? "*":""}`}
        value={value}
        placeholder={placeholder}
        validRange={{startDate: new Date()}}
        onChange={onChangeText}
        outlineColor="#E0E0E0"
        style={{ ...globalStyles.input, ...style }}
        inputMode="start"
        readOnly={readOnly}       
        editable={!readOnly}
        disabled={readOnly}
      />
    ) : (
      <TextInput
        mode="outlined"
        label={`${label}${required ? "*":""}`}
        placeholder={placeholder}
        value={value}
        inputMode={inputMode}
        editable={!readOnly}
        disabled={readOnly}
        secureTextEntry={hidePassword}
        left={icon ? <TextInput.Icon icon={icon} onPress={iconOnPress} /> : null}
        right={secureTextEntry ? (hidePassword ? <TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} /> : <TextInput.Icon icon="eye-off" onPress={() => setHidePassword(!hidePassword)} />) : null}
        style={{ ...globalStyles.input, ...style }}
        outlineStyle={{ ...outlineStyle }}
        outlineColor="#E0E0E0"
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
      />)
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
