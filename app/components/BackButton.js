/**
 * Purpose: This file contains logic for the back button displayed on multiple screens
 * to navigate back to the home screen.
 *
 */
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import colors from "../config/colors";

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
