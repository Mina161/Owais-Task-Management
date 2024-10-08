import * as React from "react";
import { connect } from "react-redux";
import { Dimensions, View, Platform, SafeAreaView, Image, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import AppBar from "./AppBar";
import { Appbar } from "react-native-paper";

export const WebViewPage = ({ route }) => {
  const { url } = route.params;
  const navigation = useNavigation();

  return (
    <>
      <AppBar navigation={navigation} title={"Attachment"} action={<Appbar.Action color="#1E5154" icon="web" onPress={() => Linking.openURL(url)} />} />
      <SafeAreaView style={{ flex: 1 }}>
        {Platform.OS !== "web" && <WebView style={{ flex: 1 }} source={{ uri: url }} />}
        {Platform.OS === "web" && <iframe style={{ flex: 1 }} src={url} />}
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WebViewPage);
