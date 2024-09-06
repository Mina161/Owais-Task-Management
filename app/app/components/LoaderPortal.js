import * as React from "react";
import { ActivityIndicator, Modal, Portal } from "react-native-paper";
import { connect } from "react-redux";

export const LoaderPortal = ({ }) => {

  return (
    <Portal>
      <Modal visible={true} contentContainerStyle={{ backgroundColor: "rgba(0,0,0,0)" }}>
        <ActivityIndicator size={50}/>
      </Modal>
    </Portal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoaderPortal);
