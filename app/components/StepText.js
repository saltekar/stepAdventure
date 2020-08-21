import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../config/colors";

class StepText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>{this.props.steps}</Text>;
  }
}

export default StepText;

const styles = StyleSheet.create({
  token: {
    color: colors.white,
    top: 40,
    right: 10,
    fontSize: 20,
    position: "absolute",
  },
});
