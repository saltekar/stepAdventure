import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import BlinkCursor from "../components/BlinkCursor";
import colors from "../config/colors";

export default class StoryView extends React.Component {
  render() {
    return (
      <View style={styles.story}>
        <Text style={styles.text}>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  story: {
    flex: 2,
    top: 80,
    left: 20
  },
  text: {
    color: colors.white,
    fontSize: 20
  }
});
