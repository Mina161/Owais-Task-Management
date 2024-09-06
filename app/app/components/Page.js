import * as React from "react";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";

export const Page = ({
  children,
  appBar,
}) => {

  return (
    <>
      {appBar}
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ padding: 15, backgroundColor: "white" }}>
          {children}
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
