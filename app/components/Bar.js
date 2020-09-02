import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import colors from "../config/colors";

export default function Bar(props) {
  const ratio = 9 / (props.max * 10);

  return (
    <View
      style={{
        height: 40,
        width: props.width * ratio * 100 + "%",
        backgroundColor: colors.primary,
        left: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 40,
        top: -40
      }}
    >
      <Text style={styles.barTitle}>{props.title}</Text>
      <Text style={{ color: colors.white, right: 10 }}>{props.width}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  barTitle: {
    marginTop: -20,
    alignSelf: "flex-start",
    position: "absolute",
    left: 0
  }
});
