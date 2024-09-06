import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, Image, Dimensions, ViewBase, KeyboardAvoidingView } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Text,
  Appbar,
  TextInput,
  ActivityIndicator,
  Avatar,
  Card,
  Portal,
  Modal
} from "react-native-paper";
import {
  Input,
  PrimaryButton,
  Page,
  globalStyles,
  SecondaryButton,
  AppBar,
  LoaderPage,
  Dialog,
  SearchBar
} from "../../app/components";
import { logout } from "../../app/store/actions/authActions";
import { getTasks } from "../../app/store/actions/dataActions";
import TaskCard from "../../app/components/TaskCard";
import CreateTaskModal from "../../app/components/CreateTaskModal";
import { LoaderPortal } from "../../app/components/LoaderPortal";

export const TasksHome = ({ user, getTasks, tasks, logout, isLoading }) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [reload, setReload] = useState(false);
  const [createTaskVisible, setCreateTaskVisible] = useState(false);

  useEffect(() => {
    getTasks({})
  }, [reload])

  const onSearch = () => {
    getTasks({ searchTerm: searchTerm.length > 0 ? searchTerm : null })
  }

  return (
    <Page>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Appbar.Header style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text variant="medium" style={{ color: "#D49600", fontSize: 18 }}>Welcome Back!</Text>
            <Text variant="medium" style={{ fontSize: 24 }}>{user?.name.toUpperCase()}</Text>
          </View>
          <Card mode="outlined" style={{ borderColor: "white" }} onPress={() => logout()}>
            <Avatar.Text style={{ margin: 5 }} labelStyle={{ fontFamily: "Montserrat-Bold" }} label={user?.name[0]} />
          </Card>
        </Appbar.Header>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Search Tasks"} onSearch={onSearch} />
        <View style={{ flex: 1, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          <View style={{ width: "50%", justifyContent: "center" }}>
            <Text variant="bold" style={{ fontSize: 36 }}>{tasks?.length > 999 ? `${tasks?.length / 1000}K` : tasks?.length} Tasks</Text>
          </View>
          <View style={{ width: "50%" }}>
            <PrimaryButton fullWidth text={"Add new tasks"} icon={"plus"} onPress={() => setCreateTaskVisible(true)} />
          </View>
        </View>
        <View>
          {tasks && tasks.length > 0 && tasks.map((task) => {
            return <TaskCard key={task.id} task={task} reload={reload} setReload={setReload} />
          })}
          {isLoading && <LoaderPortal />}
        </View>
        <CreateTaskModal visible={createTaskVisible} onDismiss={() => setCreateTaskVisible(false)} reload={reload} setReload={setReload} />
      </KeyboardAvoidingView>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  isLoading: state?.records?.isLoading,
  tasks: state?.records?.tasks
});

const mapDispatchToProps = { logout, getTasks };

export default connect(mapStateToProps, mapDispatchToProps)(TasksHome);
