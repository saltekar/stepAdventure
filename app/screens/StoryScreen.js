import React from "react";
import { ImageBackground, StyleSheet, StatusBar } from "react-native";

import StoryView from "../components/StoryView";
import BackButton from "../components/BackButton";

/*
Story screen of app. Contains all components related 
to displaying text and user decision making.
*/
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
