import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import colors from "../config/colors";

export default function TokenButton({ decisionCost, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{Math.floor(decisionCost / 20)}</Text>
      <Image style={styles.tokenImage} source={require("../assets/coin.png")} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
  tokenImage: {
    width: 20,
    height: 21,
  },
});
