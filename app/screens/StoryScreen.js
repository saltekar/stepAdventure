import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import StoryView from "../components/StoryView";

import colors from "../config/colors";

function StoryScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/forest.jpg")}
    >
      {/* Sets status bar to white */}
      <StatusBar barStyle="light-content" />

      {/* Text for the story */}
      <StoryView />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ color: colors.white }}>Back</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: colors.primary,
    height: 20,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    top: 40,
    left: 10,
    position: "absolute",
  },
  background: {
    flex: 1,
  },
  steps: {
    alignSelf: "flex-end",
    position: "absolute",
    top: -10,
    right: 5,
  },
});

export default StoryScreen;
