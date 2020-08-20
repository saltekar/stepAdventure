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
      pastStepCount: 0,
    };
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    const end = new Date();
    const start = new Date();
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        this.setState({ pastStepCount: result.steps });
      },
      (error) => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error,
        });
      }
    );
    console.log(this.state.pastStepCount);
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
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
