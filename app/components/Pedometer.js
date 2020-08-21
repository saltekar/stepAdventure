import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { Pedometer } from "expo-sensors";
import ProgressBar from "./ProgressBar";
import StepToken from "./StepToken";

import colors from "../config/colors";

export default class Pedometer extends React.Component {
  constructor() {
    super();

    this.state = {
      steps: 0,
      savedSteps: 0,
      progressBarVisible: true,
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
    this.setState({ progressBarVisible: true });
    this._subscription = Pedometer.watchStepCount((currSteps) => {
      this.setState({ steps: this.state.savedSteps + currSteps.steps });
    });
  };

  _unsubscribe = () => {
    this.save(this.state.steps);
    console.log(this.state.steps + "  --unsub");

    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  initialSteps = async () => {
    try {
      this.load().then((currSteps) => {
        if (!isNaN(currSteps)) {
          console.log(currSteps + " -- saved");
          this.setState({ steps: currSteps });
          this.setState({ savedSteps: currSteps });
        } else {
          this.save(this.state.steps);
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

  getData = async (val) => {
    try {
      if (val == "pastCurrSteps") {
        const pastCurrSteps = await AsyncStorage.getItem(val);
        return parseInt(pastCurrSteps);
      }
    } catch (err) {
      console.log(err);
    }
  };

  setStorage = async (type, val) => {
    try {
      if (type == "pastCurrSteps") {
        await AsyncStorage.setItem(type, val + "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  textStyle = function () {
    const currSteps = this.state.steps;
    const scale = 350 / this.props.distance;

    const leftAdjust = -182;

    console.log(currSteps + " currsteps");
    if (leftAdjust + currSteps * scale >= 350 + leftAdjust) {
      this.save(0);
      this.setState({ savedSteps: 0 });
      this.setState({ steps: 0 });

      console.log(this.state.steps);

      console.log("I ran");
      this.setState({ continueButtonVisible: true });
      this.setState({ progressBarVisible: false });
      this._unsubscribe();
      return;
    }

    return {
      color: colors.white,
      fontSize: 60,
      lineHeight: 27,
      left: leftAdjust + currSteps * scale,
      top: -8,
      position: "absolute",
    };
  };

  render() {
    return (
      <ProgressBar
      this.props/>
    );
  }
}