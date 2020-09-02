import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";

import StoryView from "../components/StoryView";

import colors from "../config/colors";
import BackButton from "../components/BackButton";

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

      <BackButton nav={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  }
});

export default StoryScreen;
