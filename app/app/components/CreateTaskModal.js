import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image } from "react-native";
import { Text, Snackbar, Portal, Modal, Card, Divider } from "react-native-paper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export const TaskManipulationModal = ({ visible, onDismiss, onEdit, onDelete }) => {

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ marginHorizontal: "5%" }}>
          
        </Card>
      </Modal>
    </Portal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskManipulationModal);
