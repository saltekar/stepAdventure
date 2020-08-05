import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../config/colors";

class BlinkCursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: true
    };
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 800);
  }

  render() {
    const { content } = this.props;
    const { showText } = this.state;
    return <Text style={styles.storyText}>{showText ? content : ""}</Text>;
  }
}

export default BlinkCursor;

const styles = StyleSheet.create({
  storyText: {
    color: colors.white,
    fontSize: 25
  }
});
