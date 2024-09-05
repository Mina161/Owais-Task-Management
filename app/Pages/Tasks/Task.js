import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  ActivityIndicator,
  Card,
  IconButton,
  Chip,
  Icon
} from "react-native-paper";
import {
  PrimaryButton,
  Page,
  AppBar,
} from "../../app/components";
import { logout } from "../../app/store/actions/authActions";
import { getTasks } from "../../app/store/actions/dataActions";
import moment from "moment";
import DangerButton from "../../app/components/DangerButton";
import { TaskManipulationModal } from "../../app/components/TaskManipulationModal";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { uploadFile } from "../../app/config/firebase";

export const Task = ({ route, getTasks, task, isLoading }) => {
  const navigation = useNavigation();
  const { taskId } = route.params;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getTasks({ id: taskId })
  }, [taskId])

  const getBlobFromUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob;
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*', multiple: true });
      if (!result.canceled) {
        const files = await Promise.all(result.assets.map(async (asset) => {
          console.log(asset)
          if (asset.file) {
            return { name: asset.name, mimeType: asset.mimeType, file: asset.file }
          }
          const response = await fetch(asset.uri);
          const blob = await response.blob();
          return { name: asset.name, mimeType: asset.mimeType, file: blob };
        }))
        const uploadedFiles = await Promise.all(files.map(async (file) => {
          return await uploadFile(file, "attachments/")
        }))
        console.log('Files uploaded: ', uploadedFiles);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page appBar={<AppBar navigation={navigation} title={"Task Details"} />}>
      {!isLoading && task && <View>
        <Card mode="outlined" style={{ width: "100%", marginVertical: 10, borderColor: "#E0E0E0" }}>
          <Card.Content>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Text style={{ color: moment(task.dueDate).diff(moment(), "days") < 7 ? "#FF4C23" : "#7E92A2" }}><Icon source="calendar" color={moment(task.dueDate).diff(moment(), "days") < 7 ? "#FF4C23" : "#7E92A2"} /> {moment(task.dueDate).format("DD MMM YYYY")}</Text>
              </View>
              <View>
                <IconButton icon="dots-horizontal" onPress={() => setVisible(true)} />
              </View>
            </View>
            <View style={{ marginTop: 10, display: "flex", justifyContent: "flex-start", flexDirection: "row" }}>
              <Chip style={{ marginRight: 5, width: "40%", backgroundColor: task.priority === "Low" ? "gray" : task.priority === "Medium" ? "orange" : "red" }} textStyle={{ flex: 1, textAlign: "center" }}>{task.priority}</Chip>
              <Chip style={{ marginRight: 5, width: "40%", backgroundColor: task.status === "New" ? "gray" : task.status === "In Progress" ? "blue" : "green" }} textStyle={{ flex: 1, textAlign: "center" }}>{task.status}</Chip>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text variant="bold" style={{ fontSize: 18 }}>{task.title}</Text>
            </View>
          </Card.Content>
        </Card>
        <Card id={task.id} mode="outlined" style={{ width: "100%", marginVertical: 10, borderColor: "#E0E0E0" }} onPress={() => navigation.navigate("Task", { id: task.id })}>
          <Card.Content>
            <View>
              <Text variant="medium">Description</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 14, marginBottom: 10 }}>{task.description}</Text>
            </View>
          </Card.Content>
        </Card>
        <PrimaryButton text={"Pick Documents"} onPress={pickDocument} />
        <TaskManipulationModal visible={visible} onDismiss={() => setVisible(false)} />
      </View>}
      {isLoading && <ActivityIndicator size={50} />}
    </Page>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  isLoading: state?.records?.isLoading,
  task: state?.records?.task
});

const mapDispatchToProps = { getTasks };

export default connect(mapStateToProps, mapDispatchToProps)(Task);
