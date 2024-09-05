import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image } from "react-native";
import { Text, Card, TextInput, IconButton, Avatar } from "react-native-paper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import Input from "./Input";

export const Searchbar = ({ onSearch, placeholder, searchTerm, setSearchTerm }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
    <View style={{ borderRadius: 250, padding: 5 }}>
      <Input
        placeholder={placeholder}
        icon={"magnify"}
        iconOnPress={onSearch}
        value={searchTerm}
        fullWidth
        onChangeText={(text) =>
          setSearchTerm(text)
        }
        style={{ marginVertical: 10, borderRadius: 250 }}
        outlineStyle={{ borderRadius: 250 }}
        returnKeyType={"search"}
        onSubmitEditing={onSearch}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
