import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image } from "react-native";
import { Text, Card, TextInput, IconButton, Avatar } from "react-native-paper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";

export const Searchbar = ({ onSearch, placeholder, searchValue, setSearchValue }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
      <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", backgroundColor: "#E5F8FF", alignItems: "center", borderRadius: 250, padding: 5}}>
        {/* <Avatar.Icon style={{backgroundColor: "#E5F8FF"}} size={25} icon="sticker-emoji"/> */}
        <TextInput
          mode="outlined"
          placeholder={placeholder}
          value={searchValue}
          activeOutlineColor="#E5F8FF"
          outlineColor="#E5F8FF"
          style={{backgroundColor: "#E5F8FF", marginLeft: 10, borderRadius: 50, width: width*0.7}}
          onChangeText={(text) => setSearchValue(text)}
        />
        <IconButton onPress={onSearch} icon="magnify" />
      </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
