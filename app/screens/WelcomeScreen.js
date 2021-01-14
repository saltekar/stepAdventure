/**
 * Purpose: This file creates the home screen of this app.
 * All content displayed on this screen comes from the DailySteps component.
 */

import { StyleSheet, ImageBackground, StatusBar } from "react-native";
import colors from "../config/colors";
import DailySteps from "../components/DailySteps";

function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("../assets/creepy.jpg")}
      style={styles.background}
    >
      {/* Sets status bar to black */}
      <StatusBar barStyle="dark-content"></StatusBar>

      {/* Steps for day */}
      <DailySteps />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: colors.primary,
    height: 60,
    width: "40%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%"
  },
  activityButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    bottom: 15,
    left: 15
  },
  background: {
    flex: 1
  },
  buttons: {
    flex: 1,
    alignItems: "center"
  },
  buttonText: {
    color: colors.white,
    fontSize: 30
  },
  dailystep: {
    flex: 1
  },
  heading: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    top: -60
  },
  settingButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    bottom: 15,
    right: 15
  },
  settingsIcon: {
    flex: 1,
    aspectRatio: 0.6,
    resizeMode: "contain"
  },
  stepCounter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  walkingPerson: {
    flex: 1,
    aspectRatio: 0.6,
    resizeMode: "contain"
  }
});

export default WelcomeScreen;
