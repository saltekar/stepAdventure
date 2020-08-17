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

  textStyle = function() {
    const currsteps = this.state.steps;

    console.log(currsteps);
    return {
      color: colors.white,
      fontSize: 60,
      lineHeight: 27,
      left: -180,
      top: -8,
      position: "absolute"
    };
  };

  render() {
    Pedometer.watchStepCount(currSteps => {
      this.save(currSteps.steps);
    });
    return (
      <View style={styles.barBox}>
        <View style={styles.bar}></View>
        <Text style={this.textStyle()}>|</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    width: 350,
    height: 4,
    backgroundColor: colors.white,
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center"
  },
  barBox: {
    backgroundColor: "white"
  }
});
