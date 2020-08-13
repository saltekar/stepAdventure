import React, { useState } from "react";
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

import { Pedometer } from "expo-sensors";
import { continueStory } from "../components/StoryView";
import StoryView from "../components/StoryView";
import colors from "../config/colors";
import StepBank from "../components/StepBank";
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

function StoryScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/forest.jpg")}
    >
      {/* Sets status bar to white */}
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.steps}>
        <StepBank />
      </SafeAreaView>
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
    position: "absolute"
  },
  background: {
    flex: 1
  },
  steps: {
    alignSelf: "flex-end",
    position: "absolute",
    top: -10,
    right: 5
  }
});

export default StoryScreen;
