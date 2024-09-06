import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image, KeyboardAvoidingView } from "react-native";
import { Text, Snackbar, Portal, Modal, Card, Divider, Chip, ActivityIndicator } from "react-native-paper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";
import Input from "./Input";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from "../config/firebase";
import Dialog from "./Dialog";
import { deleteTask, editTask, getTasks } from "../store/actions/dataActions";
import { schedulePushNotification } from "./Notifications";
import moment from "moment";
import { Task } from "../../Pages";
import TaskView from "./TaskView";

export const DeleteTaskModal = ({ visible, onDismiss, reload, setReload, isLoading, message, taskId, getTasks, task, deleteTask, onSubmit }) => {
  const [submitted, setSubmitted] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [dialogData, setDialogData] = useState({
    title: null,
    subTitle: null,
  })

  useEffect(() => {
    if (visible) {
      getTasks({ id: taskId })
    }
  }, [visible, taskId])

  const handleSubmit = async () => {
    deleteTask({ id: taskId });
    setSubmitted(true);
  }

  useEffect(() => {
    if (message) {
      setDialogData({
        title: message,
        subTitle: "",
      })
      if (submitted) {
        setDialogVisible(true);
        setReload && setReload(!reload)
        onSubmit && onSubmit()
        onDismiss();
      } else {
        setDialogVisible(false)
      }
    }
  }, [message, submitted, isLoading])

  return (
    <Portal>
      <Dialog
        open={dialogVisible}
        onDismiss={() => { setDialogVisible(false); setSubmitted(false); }}
        title={dialogData.title}
        description={dialogData.subTitle}
        action1={() => { setDialogVisible(false); setSubmitted(false); }}
        action1Text={"Close"}
      />
      <Modal visible={visible} onDismiss={onDismiss} style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ marginHorizontal: "5%", backgroundColor: "white" }}>
          <Card.Content>
            <ScrollView>
              <Text style={{ color: "#FF4C23", fontSize: 18, marginBottom: 5 }}>Delete Task</Text>
              <Text variant="medium" style={{ fontSize: 24, marginBottom: 10 }}>Are you sure you want to delete the task?</Text>
              <TaskView />
              <DangerButton style={{ marginBottom: 10 }} text={"Confirm"} fullWidth onPress={handleSubmit} />
              <PrimaryButton text={"Cancel"} fullWidth onPress={() => onDismiss()} />
            </ScrollView>
          </Card.Content>
        </Card>
      </Modal>
    </Portal >
  );
};

const mapStateToProps = (state) => ({
  task: state?.records?.task,
  isLoading: state?.wait?.isLoading || state?.records?.isLoading,
  isError: state?.wait?.isError,
  message: state?.wait?.data,
});

const mapDispatchToProps = { deleteTask, getTasks };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTaskModal);
