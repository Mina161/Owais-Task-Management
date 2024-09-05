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
      <Modal visible={visible} onDismiss={onDismiss} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Card style={{ marginHorizontal: "10%" }}>
          <SecondaryButton fullWidth text={"Edit Task"} icon={"pen"} onPress={onEdit} />
          <Divider />
          <DangerButton mode={"text"} fullWidth text={"Delete Task"} icon={"delete"} style={{ textColor: "red" }} onPress={onDelete} />
        </Card>
      </Modal>
    </Portal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskManipulationModal);
