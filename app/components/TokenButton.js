import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import colors from "../config/colors";

export default function TokenButton({ decisionCost, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{Math.floor(decisionCost / 25)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "12%",
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: 7,
    paddingRight: 7,
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
});
