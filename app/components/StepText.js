import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
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
    return (
      <View style={styles.tokenContainer}>
        <Text style={styles.token}>{this.state.tokens}</Text>
        <Image
          style={styles.tokenImage}
          source={require("../assets/coin.png")}
        />
      </View>
    );
  }
}

export default StepText;

const styles = StyleSheet.create({
  tokenContainer: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  token: {
    color: colors.white,
    top: 45,
    right: 30,
    fontSize: 20,
    alignSelf: "flex-end"
  },
  tokenImage: {
    width: 20,
    height: 21,
    alignSelf: "flex-end",
    top: 23,
    right: 10
  }
});
