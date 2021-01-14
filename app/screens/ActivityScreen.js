/**
 * Purpose: This file creates the Activity Center Screen that contains horizontal bar graph
 * data for a user's previous week of step data. This screen can be navigated to from the Welcome(home) screen.
 */
import React from "react";

import { ImageBackground, StyleSheet } from "react-native";
import ActivityCenter from "../components/ActivityCenter";
import BackButton from "../components/BackButton";

/*
Activity screen that shows user's step counts for last week.
Contains Activity center component.
*/
function ActivityScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/creepy.jpg")}
      style={styles.background}
    >
      <ActivityCenter />

      <BackButton nav={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default ActivityScreen;
