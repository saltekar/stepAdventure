import React from "react";
import { StyleSheet, View, Text, AsyncStorage, Image } from "react-native";

import colors from "../config/colors";

export default class StepToken extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: 0
    };

    this.initialize();
  }

  initialize() {
    this.loadT().then(tokensT => {
      if (!isNaN(tokensT)) {
        this.setState({ tokens: tokensT });
      } else {
        this.saveT(this.state.tokens);
      }
    });
  }

  saveT = async val => {
    try {
      await AsyncStorage.setItem("tokens", val + "");
    } catch (err) {
      console.log(err);
    }
  };

  loadT = async () => {
    try {
      const steps = await AsyncStorage.getItem("tokens");
      return parseInt(steps);
    } catch (err) {
      console.log(err);
    }
  };

  componentWillUnmount() {}

  componentDidUpdate() {
    this.initialize();
  }
  render() {
    return (
      <View style={styles.tokenContainer}>
        {this.props.black == "True" ? (
          <Text style={styles.token}>{this.state.tokens}</Text>
        ) : (
          <Text style={styles.token2}>{this.state.tokens}</Text>
        )}

        <Image
          style={styles.tokenImage}
          source={require("../assets/coin.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tokenContainer: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  token: {
    color: "black",
    top: 45,
    right: 30,
    fontSize: 20,
    alignSelf: "flex-end"
  },
  token2: {
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
