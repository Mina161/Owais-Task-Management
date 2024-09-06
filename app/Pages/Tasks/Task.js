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
  Icon,
  Portal,
  Modal
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
import { schedulePushNotification } from "../../app/components/Notifications";
import TaskView from "../../app/components/TaskView";
import { LoaderPortal } from "../../app/components/LoaderPortal";

export const Task = ({ route, getTasks, task, isLoading }) => {
  const navigation = useNavigation();
  const { taskId } = route.params;
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    getTasks({ id: taskId })
    schedulePushNotification({ title: "Testing" })
  }, [taskId, reload])

  return (
    <Page appBar={<AppBar navigation={navigation} title={"Task Details"} />}>
      {task && <TaskView task={task} reload={reload} setReload={setReload} onTaskDelete={() => navigation.goBack()} navigation={navigation} />}
      {isLoading && <LoaderPortal />}
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
