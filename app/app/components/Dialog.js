import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image } from "react-native";
import { customText, Card, Avatar, Modal, Portal } from "react-native-paper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import SecondaryButton from "./SecondaryButton";
const Text = customText("bold");

export const Dialog = ({ open, onDismiss, title, description, action1Text, action2Text, action1Icon, action2Icon, action1, action2 }) => {
  const containerStyle = { backgroundColor: '#E5F8FF', padding: 30, margin: 30, borderRadius: 20 };

  return (
    <View>
      <Portal>
        <Modal
          visible={open}
          onDismiss={onDismiss}
          contentContainerStyle={containerStyle}
        >
          <Text variant="bold" style={{fontSize: 24}}>{title}</Text>
          <Text style={{fontSize: 14}}>{description}</Text>
          <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
            {action1Text && <SecondaryButton smallFactor icon={action1Icon} text={action1Text} onPress={action1} />}
            {action2Text && <SecondaryButton smallFactor icon={action2Icon} text={action2Text} onPress={action2}/>}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
