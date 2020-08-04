import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

function StoryScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/forest.jpg")}
    >
      {/* Sets status bar to white */}
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ color: colors.white }}>Back</Text>
      </TouchableOpacity>
      <View style={styles.story}>
        <Text style={styles.storyText}>...You're finally awake.</Text>
        <Text style={styles.storyText}>
          How did it become night time already?
        </Text>
        <Text style={styles.storyText}>How long have I been out for?</Text>
      </View>
      <View style={styles.stepCounter}>
        <Text style={{ fontSize: 50, color: colors.white }}> 22</Text>
        <Text style={{ fontSize: 30, color: colors.white }}> Steps</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.button} />
        <View style={styles.button} />
        <View style={styles.button} />
        <View style={styles.button} />
      </View>
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
    position: "absolute"
  },
  background: {
    flex: 1
  },
  buttons: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  button: {
    width: "80%",
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  stepCounter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  story: {
    flex: 1,
    top: 80,
    left: 20
  },
  storyText: {
    color: colors.white,
    fontSize: 20
  },
  text: {
    color: colors.white,
    fontSize: 18
  }
});

export default StoryScreen;
