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

function SettingScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/creepy.jpg")}
      style={styles.background}
    >
      <View style={styles.title}>
        <Text style={styles.settingsText}>Settings</Text>
      </View>

      <View style={styles.settingsContent}></View>

      <BackButton nav={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  settingsContent: {
    flex: 4
  },
  settingsText: {
    fontSize: 38,
    color: colors.primary
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SettingScreen;
