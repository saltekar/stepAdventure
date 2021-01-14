import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../config/colors";

/*
Creates a blinking cursor that indicates when more text 
still needs to be shown on screen. This prompts users to 
keep pressing screen to continue story.
*/
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
