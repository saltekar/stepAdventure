import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";

import colors from "../config/colors";
import StepToken from "../components/StepToken";

import DailySteps from "../components/DailySteps";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/creepy.jpg")}
      style={styles.background}
    >
      {/* Sets status bar to black */}
      <StatusBar barStyle="dark-content"></StatusBar>

      <StepToken black="True" />

      {/* Title */}
      <View style={styles.heading}>
        <Text
          style={{
            fontSize: 80,
            color: "#253237",
            textAlign: "center",
            fontFamily: "Cochin-Bold",
            marginTop: 50
          }}
        >
          Step Adventure
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: "#253237",
            textAlign: "center",
            fontFamily: "Cochin",
            marginTop: 15
          }}
        >
          Project Sahaya
        </Text>
      </View>

      {/* Play Button */}
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("StoryScreen");
          }}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>

      {/* Steps for day */}
      <View style={styles.dailystep}>
        <DailySteps />
      </View>

      {/* Activity Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ActivityScreen")}
        style={styles.activityButton}
      >
        <Image
          style={styles.walkingPerson}
          source={require("../assets/activity-person.png")}
        />
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("SettingScreen")}
        style={styles.settingButton}
      >
        <Image
          style={styles.settingsIcon}
          source={require("../assets/settingsIcon.png")}
        />
      </TouchableOpacity>
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
