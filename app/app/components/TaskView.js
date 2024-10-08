import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Dimensions, Platform, ScrollView, Image, KeyboardAvoidingView } from "react-native";
import { Text, Card, Chip, Icon, IconButton } from "react-native-paper";
import moment from "moment";
import { getFileLink } from "../config/firebase";

export const TaskView = ({ task, setVisible, navigation }) => {

  const openAttachment = async (attachment) => {
    const url = await getFileLink(attachment);
    navigation.navigate("Attachment", { url })
  }

  return (
    <View>
      <Card mode="outlined" style={{ width: "100%", marginVertical: 10, borderColor: "#E0E0E0" }}>
        <Card.Content>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: moment(task?.dueDate).diff(moment(), "days") < 7 ? "#FF4C23" : "#7E92A2" }}><Icon source="calendar" color={moment(task?.dueDate).diff(moment(), "days") < 7 ? "#FF4C23" : "#7E92A2"} /> {moment(task?.dueDate).format("DD MMM YYYY")}</Text>
            </View>
            <View>
              <IconButton icon="dots-horizontal" onPress={() => setVisible(true)} />
            </View>
          </View>
          <View style={{ marginTop: 10, display: "flex", justifyContent: "flex-start", flexDirection: "row" }}>
            <Chip style={{ marginRight: 5, width: "40%", backgroundColor: task?.priority === "Low" ? "gray" : task?.priority === "Medium" ? "orange" : "red" }} textStyle={{ flex: 1, textAlign: "center" }}>{task?.priority}</Chip>
            <Chip style={{ marginRight: 5, width: "40%", backgroundColor: task?.status === "New" ? "gray" : task?.status === "In Progress" ? "blue" : "green" }} textStyle={{ flex: 1, textAlign: "center" }}>{task?.status}</Chip>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text variant="bold" style={{ fontSize: 18 }}>{task?.title}</Text>
          </View>
        </Card.Content>
      </Card>
      <Card id={task?.id} mode="outlined" style={{ width: "100%", marginVertical: 10, borderColor: "#E0E0E0" }}>
        <Card.Content>
          <View>
            <Text variant="medium">Description</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>{task?.description}</Text>
          </View>
        </Card.Content>
      </Card>
      <View style={{ borderColor: "#E0E0E0", borderWidth: 1, borderStyle: Platform.OS === "ios" ? "solid" : "dashed", borderRadius: 10, padding: 10, marginVertical: 10 }}>
        <Text>{task?.attachments.length} Attachment{task?.attachments.length === 1 ? "" : "s"}</Text>
        <View style={{ fex: 1, justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
          {task?.attachments.map((attachment, idx) => {
            return <Chip onPress={navigation ? () => openAttachment(attachment) : null} key={idx} textStyle={{ flex: 1, textAlign: "center" }} style={{ width: "45%", marginEnd: 5, marginTop: 5, backgroundColor: "#D49600", }}>
              {attachment.split("_").slice(1).join(" ")}
            </Chip>
          })}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  task: state?.records?.task,
  isLoading: state?.wait?.isLoading || state?.records?.isLoading,
  isError: state?.wait?.isError,
  message: state?.wait?.data,
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
