import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import colors from "../config/colors";

/*
Back button navigates back to home screen.
*/
export default function BackButton(props) {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => props.nav.navigate("Home")}
    >
      <Text style={{ color: colors.white }}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: colors.primary,
    height: 25,
    width: "16%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    top: 46,
    left: 10,
    position: "absolute"
  }
});
