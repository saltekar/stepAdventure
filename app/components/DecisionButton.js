import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

export default class DecisionButton extends React.Component {
  constructor() {
    super();

    this.state = {
      showButton: true
    };
  }

  toggleShow = () => {
    this.setState({ showButton: !this.state.showButton });
  };

  render() {
    return <TouchableOpacity style={styles.button}></TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});
