import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, Image, Dimensions, ViewBase } from "react-native";
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
  Card
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

export const TasksHome = ({ user, getTasks, tasks, logout, isLoading }) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getTasks({})
  }, [])

  const onSearch = () => {
    getTasks({ searchTerm: searchTerm.length > 0 ? searchTerm : null })
  }

  return (
    <Page>
      <Appbar.Header style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
        <View>
          <Text variant="medium" style={{ color: "#D49600", fontSize: 18 }}>Welcome Back!</Text>
          <Text variant="medium" style={{ fontSize: 24 }}>{user?.name.toUpperCase()}</Text>
        </View>
        <View onPress={() => logout()}>
          <Avatar.Text style={{ margin: 5 }} labelStyle={{ fontFamily: "Montserrat-Bold" }} label={user?.name[0]} />
        </View>
      </Appbar.Header>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Search Tasks"} onSearch={onSearch} />
      <View>
        {!isLoading && tasks && tasks.length > 0 && tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />
        })}
        {isLoading && <ActivityIndicator size={50} />}
      </View>
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
