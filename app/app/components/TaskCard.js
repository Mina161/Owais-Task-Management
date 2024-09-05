import * as React from "react";
import { connect } from "react-redux";
import { View, Dimensions, Platform, Image } from "react-native";
import { Text, Card, Avatar, IconButton, Modal, Portal, Divider, Chip, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import SnackBar from "./SnackBar";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export const TaskCard = ({ task }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Card id={task.id} key={task.id} mode="outlined" style={{ width: "100%", marginVertical: 10, borderColor: "#E0E0E0" }} onPress={() => navigation.navigate("Task", { taskId: task.id })}>
        <Card.Content>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: moment(task.dueDate).diff(moment(), "days") < 7 ? "#FF4C23" : "#7E92A2" }}><Icon source="calendar" color={moment(task.dueDate).diff(moment(), "days") < 7 ? "#FF4C23" : "#7E92A2"} /> {moment(task.dueDate).format("DD MMM YYYY")}</Text>
            </View>
            <View>
              <IconButton icon="dots-horizontal" onPress={() => setVisible(true)} />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text variant="bold" style={{ fontSize: 18, marginBottom: 10 }}>{task.title}</Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>{task.description.slice(0, 150)}{task.description.length > 150 ? "..." : ""}</Text>
          </View>
          <View style={{ marginTop: 10, display: "flex", justifyContent: "flex-start", flexDirection: "row" }}>
            <Chip style={{ marginRight: 5, width: "40%", backgroundColor: task.priority === "Low" ? "gray" : task.priority === "Medium" ? "orange" : "red" }} textStyle={{ flex: 1, textAlign: "center" }}>{task.priority}</Chip>
            <Chip style={{ marginRight: 5, width: "40%", backgroundColor: task.status === "New" ? "gray" : task.status === "In Progress" ? "blue" : "green" }} textStyle={{ flex: 1, textAlign: "center" }}>{task.status}</Chip>
          </View>
        </Card.Content>
      </Card>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Card style={{ marginHorizontal: "10%" }}>
            <SecondaryButton fullWidth text={"Edit Task"} icon={"pen"} />
            <Divider />
            <DangerButton mode={"text"} fullWidth text={"Delete Task"} icon={"delete"} style={{ textColor: "red" }} />
          </Card>
        </Modal>
      </Portal>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
