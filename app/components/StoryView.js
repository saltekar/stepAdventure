import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import BlinkCursor from "../components/BlinkCursor";
import colors from "../config/colors";

export default function StoryView() {
  return (
    <View style={styles.story}>
      <BlinkCursor content="|" />
    </View>
  );
}

const styles = StyleSheet.create({
  story: {
    flex: 2,
    top: 80,
    left: 20
  }
});
