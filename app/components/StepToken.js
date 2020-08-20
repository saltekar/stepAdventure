import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { Pedometer } from "expo-sensors";

import colors from "../config/colors";

export default class StepToken extends React.Component {
  constructor() {
    super();

    this.state = {
      steps: 0,
      subtraction: 50,
      tokensCollected: 0,
    };

    this.initialToken();
  }
  initialToken = async () => {
    try {
      this.load().then((currSteps) => {
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

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount((currSteps) => {
      this.setState({
        steps:
          currSteps.steps - this.state.tokensCollected * this.state.subtraction,
      });
      this.save(this.state.steps);
      this.watchCount();
      console.log(this.state.steps);
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
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

  watchCount = () => {
    if (this.state.steps > 50) {
      this.setState({ tokensCollected: this.state.tokensCollected + 1 });
    }
  };

  render() {
    return <Text style={styles.token}>{this.state.tokensCollected}</Text>;
  }
}

const styles = StyleSheet.create({
  token: {
    color: colors.white,
    top: 40,
    right: 10,
    fontSize: 20,
    position: "absolute",
  },
});
