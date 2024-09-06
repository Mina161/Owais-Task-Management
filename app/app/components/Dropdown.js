import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import globalStyles from "./Styles";
import DropDown from "react-native-paper-dropdown";

export const Dropdown = ({ label, placeholder, multiSelect, value, setValue, list, readOnly, required }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <DropDown
      label={`${label}${required ? "*":""}`}
      mode="outlined"
      visible={showDropDown}
      placeholder={placeholder}
      multiSelect={multiSelect}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={value}
      setValue={setValue}
      list={list}
      activeColor="#E0E0E0"
      style={{ ...globalStyles.input }}
      inputProps={{
        right: <TextInput.Icon icon="menu-down" />,
        style: { ...globalStyles.input },
        outlineColor: "#E0E0E0",
        disabled: readOnly,
        editable: !readOnly
      }}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
