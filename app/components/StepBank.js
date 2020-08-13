import React, { useState } from "react";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { Pedometer } from "expo-sensors";

import colors from "../config/colors";

export default class stepBank extends React.Component {
  constructor() {
    super();

    this.state = {
      steps: 0
    };

    this.initialSteps();
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(currSteps => {
      this.setState({ steps: currSteps.steps });
      this.save(this.state.steps);
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  initialSteps = async () => {
    try {
      this.load().then(currSteps => {
        console.log(currSteps);
        if (!isNaN(currSteps)) {
          this.setState({ steps: currSteps });
        } else {
          this.save(this.state.steps);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  save = async val => {
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
    return (
      <Text style={styles.stepsText}>
        {this.state.steps}
        {console.log("display: " + this.state.steps)}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  stepsText: {
    color: colors.white,
    fontSize: 25
  }
});
