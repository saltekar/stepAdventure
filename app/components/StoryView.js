import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import BlinkCursor from "../components/BlinkCursor";
import colors from "../config/colors";

export default class StoryView extends React.Component {
  constructor() {
    super();
    this.state = {
      data: "herro",
    };
  }
  setText = () => {
    this.setState({ data: "u did it!" });
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={() => this.setText()}
      >
        <View style={styles.story}>
          <Text style={styles.text}>{this.state.data}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  story: {
    flex: 2,
    top: 80,
    left: 20,
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
});
