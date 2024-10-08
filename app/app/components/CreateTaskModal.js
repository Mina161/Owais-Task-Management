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
import { createTask } from "../store/actions/dataActions";
import { schedulePushNotification } from "./Notifications";
import moment from "moment";

export const CreateTaskModal = ({ visible, onDismiss, reload, setReload, isLoading, message, createTask }) => {
  const [attachments, setAttachments] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [priority, setPriority] = useState(null);
  const [reminder, setReminder] = useState(0);
  const [dueDate, setDueDate] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickAttachments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*', multiple: true });
      if (!result.canceled) {
        const files = await Promise.all(result.assets.map(async (asset) => {
          if (asset.file) {
            return { name: asset.name, mimeType: asset.mimeType, file: asset.file }
          }
          const response = await fetch(asset.uri);
          const blob = await response.blob();
          return { name: asset.name, mimeType: asset.mimeType, file: blob };
        }))
        setAttachments([...attachments, ...files])
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeAttachment = (idx) => {
    let temp = [...attachments]
    temp = temp.filter((_, index) => index !== idx)
    setAttachments(temp)
  }

  const [submitted, setSubmitted] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [dialogData, setDialogData] = useState({
    title: null,
    subTitle: null,
  })

  const handleSubmit = async () => {
    if (!title || !description || !priority || !dueDate) {
      setDialogVisible(true)
      setDialogData({
        title: "Invalid Submission",
        subTitle: "Kindly fill all required fields",
      })
    } else {
      setUploading(true);
      const uploadedAttachments = await Promise.all(attachments.map(async (attachment) => {
        return await uploadFile(attachment, "attachments")
      }))
      setUploading(false);
      const formData = {
        title,
        description,
        priority,
        dueDate,
        attachments: uploadedAttachments,
      }
      if (reminder > 0) {
        const notficationData = {
          title: "Deadline Approaching",
          body: `Deadline for "${title}" is in ${reminder} day${reminder === 1 ? "" : "s"}`,
          date: new Date(moment(dueDate).subtract(reminder, "days").add(10, "hours"))
        }
        schedulePushNotification(notficationData)
      }
      createTask(formData);
      setSubmitted(true);
    }
  }

  useEffect(() => {
    if (message) {
      setDialogData({
        title: message,
        subTitle: reminder ? `You will be reminded ${reminder} day${reminder === 1 ? "" : "s"} before the due date` : "",
      })
      if (submitted) {
        setDialogVisible(true);
        setReload(!reload)
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
              <Text variant="medium" style={{ color: "#D49600", fontSize: 24, marginBottom: 10 }}>Add New Task</Text>
              <Input
                label="Task Title"
                placeholder="Enter task title"
                value={title}
                required
                onChangeText={(text) => setTitle(text)}
              />
              <Input
                label="Task Description"
                placeholder="Enter task description"
                value={description}
                required
                onChangeText={(text) => setDescription(text)}
              />
              <Dropdown
                label={"Priority"}
                required
                list={[
                  { label: "Low", value: "Low" },
                  { label: "Medium", value: "Medium" },
                  { label: "High", value: "High" },
                ]}
                value={priority}
                setValue={(text) => setPriority(text)}
              />
              <Input
                label="Task Due Date"
                placeholder="Enter task due date"
                required
                value={dueDate}
                inputMode={"date"}
                onChangeText={(text) => setDueDate(text)}
              />

              <Dropdown
                label={"Remind me"}
                required
                list={[
                  { label: "A week before", value: 7 },
                  { label: "2 days before", value: 2 },
                  { label: "A day before", value: 1 },
                  { label: "Never", value: 0 },
                ]}
                value={reminder}
                setValue={(text) => setReminder(text)}
              />
              <View style={{ borderColor: "#E0E0E0", borderWidth: 1, borderStyle: Platform.OS === "ios" ? "solid" : "dashed", borderRadius: 10, padding: 10, marginVertical: 10 }}>
                <Text>{attachments.length} Attachment{attachments.length === 1 ? "" : "s"}</Text>
                <View style={{ fex: 1, justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
                  {attachments.map((attachment, idx) => {
                    return <Chip key={idx} closeIcon={"close"} textStyle={{ flex: 1, textAlign: "center" }} style={{ width: "45%", marginEnd: 5, marginTop: 5, backgroundColor: "#D49600", }} onClose={() => removeAttachment(idx)}>{attachment.name}</Chip>
                  })}
                </View>
                <SecondaryButton text={"Add Attachments"} fullWidth onPress={pickAttachments} />
              </View>
              <PrimaryButton text={(isLoading || uploading) ? <ActivityIndicator color="white" /> : "Done"} fullWidth onPress={handleSubmit} />
              <SecondaryButton text={"Cancel"} fullWidth onPress={() => onDismiss()} />
            </ScrollView>
          </Card.Content>
        </Card>
      </Modal>
    </Portal >
  );
};

const mapStateToProps = (state) => ({
  isLoading: state?.wait?.isLoading,
  isError: state?.wait?.isError,
  message: state?.wait?.data,
});

const mapDispatchToProps = { createTask };

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);
