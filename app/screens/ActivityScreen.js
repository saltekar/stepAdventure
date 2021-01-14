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
    flex: 1
  }
});

export default ActivityScreen;
