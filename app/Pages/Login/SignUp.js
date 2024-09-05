import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { View, Platform, Image, Dimensions } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Text,
  Appbar,
  TextInput,
  ActivityIndicator,
  Checkbox
} from "react-native-paper";
import {
  Input,
  PrimaryButton,
  Page,
  globalStyles,
  SecondaryButton,
  AppBar,
  LoaderPage,
  Dialog
} from "../../app/components";
import { loadUser, signUp } from "../../app/store/actions/authActions";

export const Register = ({ signUp, isLoading, authErrorMessage, isError }) => {
  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    checked: false
  });

  const { email, password, name, checked } = formData;

  const handleSubmit = () => {
    if (!email || !password || !name) {
      setDialogeVisible(true)
      setDialogData({
        title: "Invalid Submission",
        subTitle: "Kindly fill all required fields",
      })
    } else if (!checked) {
      setDialogeVisible(true)
      setDialogData({
        title: "Invalid Submission",
        subTitle: "Kindly read and agree to Owitasks Privacy Policy and Terms & Conditions",
      })
    } else {
      signUp({ email, password, name });
      setSubmitted(true);
    }
  };

  const [dialogVisible, setDialogeVisible] = useState(false)
  const [dialogData, setDialogData] = useState({
    title: null,
    subTitle: null,
  })
  useEffect(() => {
    if (isError) {
      if (authErrorMessage) {
        setDialogData({
          title: "Unsuccessful Login",
          subTitle: authErrorMessage,
        })
        if (submitted) {
          setDialogeVisible(true)
        }
      }
    } else {
      setDialogeVisible(false)
    }
  }, [authErrorMessage, isError, submitted])

  return (
    <View style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}>
      <Dialog
        open={dialogVisible}
        onDismiss={() => { setDialogeVisible(false); setSubmitted(false); }}
        title={dialogData.title}
        description={dialogData.subTitle}
        action1={() => { setDialogeVisible(false); setSubmitted(false); }}
        action1Text={"Close"}
      />
      <View style={{ padding: 15 }}>
        <Text variant="medium" style={{ fontSize: 22, marginTop: 20 }}>
          Create your account!
        </Text>
        <View style={{ marginTop: 20 }}>
          <Input
            label="Full name"
            placeholder="John Doe"
            icon={"account"}
            value={name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <Input
            label="Email Address"
            placeholder="email@email.com"
            inputMode="email"
            icon={"email"}
            value={email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <Input
            label="Password"
            placeholder="Password"
            icon={"lock"}
            value={password}
            secureTextEntry
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 20 }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setFormData({ ...formData, checked: !checked });
              }}
            />
            <Text>
              I have read and agreed to OwiTasks <Text style={{color: "#D49600"}}>Privacy Policy, Terms & Conditions</Text>
            </Text>
          </View>

        </View>
        <View style={{ ...globalStyles.container, marginTop: 20 }}>
          <PrimaryButton fullWidth onPress={handleSubmit} text={isLoading ? <ActivityIndicator color="white" /> : "Sign Up"} />
        </View>
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <Text>
            Already have an account? <Text onPress={() => navigation.navigate("Login")} style={{ color: "#D49600"}}> Log In</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  authErrorMessage: state?.auth?.errorMessage,
  isError: state?.auth?.isError,
  isLoading: state?.auth?.isLoading
});

const mapDispatchToProps = { signUp };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
