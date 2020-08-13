import React, { useState } from "react";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { Pedometer } from "expo-sensors";

import colors from "../config/colors";

export default class stepBank extends React.Component {
  constructor() {
    super();
    global.steps = 0;
    this.initialSteps();
  }

  initialSteps = async () => {
    try {
      this.load().then((currSteps) => {
        if (!isNaN(currSteps)) {
          global.steps = currSteps;
        } else {
          this.save(global.steps);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  save = async (val) => {
    try {
      await AsyncStorage.setItem("steps", val + "");
    } catch (err) {
      console.log(err);
    }
  };

  load = async () => {
    try {
      const steps = await AsyncStorage.getItem("steps");
      return parseInt(steps);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    Pedometer.watchStepCount((currSteps) => {
      global.steps = currSteps.steps;
      this.save(global.steps);
    });
    return <Text style={styles.stepsText}>{global.steps}</Text>;
  }
}

const styles = StyleSheet.create({
  stepsText: {
    color: colors.white,
    fontSize: 25,
  },
});
