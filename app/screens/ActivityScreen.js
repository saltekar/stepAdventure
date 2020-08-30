import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ActivityCenter from "../components/ActivityCenter";

import colors from "../config/colors";

function ActivityScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/creepy.jpg")}
      style={styles.background}
    >
      <View style={styles.dailyAvg}>
        <Text style={styles.dailyStepsTitle}>Average Daily Steps:</Text>
        <Text style={styles.steps}>230</Text>
      </View>

      <ActivityCenter />

      {/* Back Button */}
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
  background: {
    flex: 1
  },
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
  dailyAvg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dailyStepsTitle: {
    fontSize: 38,
    color: colors.primary
  },
  steps: {
    fontSize: 30,
    color: colors.primary
  }
});

export default ActivityScreen;
