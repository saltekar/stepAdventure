import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ActivityCenter from "../components/ActivityCenter";
import BackButton from "../components/BackButton";

import colors from "../config/colors";

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
