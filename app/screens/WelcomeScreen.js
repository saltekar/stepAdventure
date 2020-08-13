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

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/creepy.jpg")}
      style={styles.background}
    >
      {/* Sets status bar to black */}
      <StatusBar barStyle="dark-content"></StatusBar>

      {/* Title */}
      <View style={styles.heading}>
        <Text
          style={{
            fontSize: 45,
            color: colors.primary
          }}
        >
          Step Adventure
        </Text>
      </View>

      {/* Step Counter */}
      <View style={styles.stepCounter}>
        <View style={styles.circle}>
          <StepCounter />
          <Text style={{ fontSize: 30, color: colors.white }}>Steps</Text>
        </View>
      </View>

      {/* lLay Button */}
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("StoryScreen")}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Play</Text>
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
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  buttonText: {
    color: colors.white,
    fontSize: 20
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9
  },
  heading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  stepCounter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WelcomeScreen;
