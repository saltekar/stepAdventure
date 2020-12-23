import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import colors from "../config/colors";

export default class DecisionButton extends React.Component {
  constructor() {
    super();

    global.buttonWrap = false;
    global.width = 0;

    this.state = {
      width: 0
    };
  }

  onLayout = e => {
    this.setState({ width: e.nativeEvent.layout.width });

    if (this.state.width < 297) {
      global.buttonWrap = false;
    }
  };

  render() {
    if (this.state.width > 297) {
      global.buttonWrap = true;
    }
    return (
      <TouchableOpacity
        onLayout={this.onLayout}
        style={[
          styles.button,
          global.buttonWrap ? { height: 70 } : { height: 45 }
        ]}
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>{this.props.decisionText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingRight: 15,
    paddingLeft: 15,
    maxWidth: 300
  },
  text: {
    color: colors.white,
    fontSize: 20
  },
  tokenImage: {
    width: 20,
    height: 21
  }
});
