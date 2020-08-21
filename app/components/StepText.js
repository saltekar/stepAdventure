import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AsyncStorage } from "react-native";

import colors from "../config/colors";

class StepText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: 0
    };

    console.log("run");
    this.getTokens();
  }

  getTokens = () => {
    this.getData("tokens").then(currTokens => {
      this.setState({ tokens: currTokens });
      console.log(currTokens + " TOKENS");
    });
  };

  getData = async val => {
    try {
      if (val == "tokens") {
        const tokens = await AsyncStorage.getItem(val);
        return parseInt(tokens);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.tokens);
    return <Text style={styles.token}>{this.state.tokens}</Text>;
  }
}

export default StepText;

const styles = StyleSheet.create({
  token: {
    color: colors.white,
    top: 40,
    right: 10,
    fontSize: 20,
    position: "absolute"
  }
});
