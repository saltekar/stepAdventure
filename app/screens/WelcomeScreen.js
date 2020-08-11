import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from "react-native";

import StepCounter from "../components/Pedometer";
import colors from "../config/colors";
import StoryView from "../components/StoryView";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/creepy.jpg")}
      style={styles.background}
    >
      {/* Sets status bar to black */}
      <StatusBar barStyle="dark-content"></StatusBar>

      {/* Top Half */}
      <View style={styles.heading}>
        <StepCounter />
        <Text style={{ fontSize: 30, color: colors.primary }}>Steps</Text>
      </View>

      {/* Bottom Half */}
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("StoryScreen")}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} style={styles.actionButton}>
          <Text style={styles.buttonText}>Continue Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: "50%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    flex: 1
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 90
  },
  buttonText: {
    color: colors.white,
    fontSize: 20
  },
  heading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WelcomeScreen;
