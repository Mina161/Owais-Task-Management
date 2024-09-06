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
import EditTaskModal from "../../app/components/EditTaskModal";
import DeleteTaskModal from "../../app/components/DeleteTaskModal";

export const Task = ({ route, getTasks, task, isLoading }) => {
  const navigation = useNavigation();
  const { taskId } = route.params;
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = React.useState(false);
  const [deleteTaskModalVisible, setDeleteTaskModalVisible] = React.useState(false);
  
  const onEdit = () => {
    setEditTaskModalVisible(true);
    setVisible(false);
  }

  const onDelete = () => {
    setDeleteTaskModalVisible(true);
    setVisible(false);
  }

  useEffect(() => {
    getTasks({ id: taskId })
    console.log(reload)
  }, [taskId, reload])

  return (
    <Page appBar={<AppBar navigation={navigation} title={"Task Details"} />}>
      {task && <TaskView task={task} reload={reload} setReload={setReload} navigation={navigation} setVisible={setVisible} />}
      {isLoading && <LoaderPortal />}
      <TaskManipulationModal visible={visible} onDismiss={() => setVisible(false)} onEdit={onEdit} onDelete={onDelete} />
      <EditTaskModal visible={editTaskModalVisible} onDismiss={() => setEditTaskModalVisible(false)} taskId={task?.id} reload={reload} setReload={setReload} />
      <DeleteTaskModal visible={deleteTaskModalVisible} onDismiss={() => setDeleteTaskModalVisible(false)} taskId={task?.id} onSubmit={() => navigation.goBack()} />
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
