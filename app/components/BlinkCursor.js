/**
 * Purpose: This file contains logic for the blinking cursor that is visible
 * when there is story text to be displayed. Once the current node's story text has been displayed,
 * the blinking cursor dissapears.
 *
 */

import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../config/colors";

class BlinkCursor extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      showText: true
    };
    setInterval(() => {
      if (this.mounted == true) {
        this.setState(previousState => {
          return { showText: !previousState.showText };
        });
      }
    }, 800);
  }

  async componentWillUnmount() {
    this.mounted = false;
  }

  async componentDidMount() {
    this.mounted = true;
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
