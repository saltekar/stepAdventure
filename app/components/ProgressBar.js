import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Pedometer } from "expo-sensors";

import colors from "../config/colors";

export default class ProgressBar extends React.Component {
  constructor() {
    super();

    this.state = {
      steps: 0,
      savedSteps: 0,
      continueButtonVisible: false,
      progressBarVisible: true
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
    console.log("subbed");
    this.setState({ progressBarVisible: true });
    this._subscription = Pedometer.watchStepCount(currSteps => {
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
      this.load().then(currSteps => {
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

  getData = async val => {
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

  textStyle = function() {
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
      position: "absolute"
    };
  };

  render() {
    return (
      <View style={styles.barBox}>
        <Text style={styles.endProgressBar}>{this.props.distance}</Text>
        <View style={styles.bar}></View>

        {this.state.progressBarVisible ? (
          <Text style={this.textStyle()}>|</Text>
        ) : null}
        {!this.state.progressBarVisible ? (
          <Text style={styles.progressEnd}>|</Text>
        ) : null}

        <Text style={styles.text}>{this.props.content}</Text>

        {this.state.continueButtonVisible ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.hideBar()}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        ) : null}
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
  button: {
    width: "80%",
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 150
  },
  continueText: {
    color: colors.white,
    fontSize: 20
  },
  text: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 27,
    flexWrap: "wrap",
    position: "absolute",
    alignSelf: "center",
    paddingTop: 20
  },
  progressEnd: {
    color: colors.white,
    fontSize: 60,
    lineHeight: 27,
    left: -182 + 423,
    top: -8,
    position: "absolute"
  },
  endProgressBar: {
    color: colors.white,
    fontSize: 15,
    right: -186,
    top: -25,
    position: "absolute"
  }
});
