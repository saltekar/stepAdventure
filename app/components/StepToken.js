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

export default class StepToken extends React.Component {
  constructor() {
    super();

    this.state = {
      steps: 0,
      subtraction: 25,
      tokensCollected: 0,
      pastTokens: 0,
      pastSteps: 0
    };

    this.initialToken();
  }

  initialToken = async () => {
    try {
      this.load().then(currSteps => {
        if (!isNaN(currSteps)) {
          this.setState({ pastSteps: currSteps });
        } else {
          this.save(this.state.steps);
        }
      });

      this.loadT().then(tokens => {
        if (!isNaN(tokens)) {
          console.log(tokens + " --loaded ");
          this.setState({ pastTokens: tokens });
        } else {
          this.saveT(this.state.pastTokens);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  tokenLoad = async () => {
    try {
      this.loadT().then(tokens => {
        if (!isNaN(tokens)) {
          console.log(tokens + " --loaded ");
          this.setState({ pastTokens: tokens });
        } else {
          this.saveT(this.state.pastTokens);
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
    this._subscription = Pedometer.watchStepCount(currSteps => {
      this.setState({
        steps:
          currSteps.steps +
          this.state.pastSteps -
          this.state.tokensCollected * this.state.subtraction
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

  save = async val => {
    try {
      await AsyncStorage.setItem("tokenSteps", val + "");
    } catch (err) {
      console.log(err);
    }
  };

  load = async () => {
    try {
      const steps = await AsyncStorage.getItem("tokenSteps");
      return parseInt(steps);
    } catch (err) {
      console.log(err);
    }
  };

  saveT = async val => {
    try {
      console.log(val + "  save tokens in stepToken");

      await AsyncStorage.setItem("tokens", val + "");
    } catch (err) {
      console.log(err);
    }
  };

  loadT = async () => {
    try {
      const steps = await AsyncStorage.getItem("tokens");
      return parseInt(steps);
    } catch (err) {
      console.log(err);
    }
  };

  watchCount = () => {
    if (this.state.steps >= this.state.subtraction) {
      this.setState({ tokensCollected: this.state.tokensCollected + 1 });
      this.saveT(this.state.tokensCollected + this.state.pastTokens);
    }
  };

  render() {
    this.save(
      this.state.steps - this.state.tokensCollected * this.state.subtraction
    );

    this.loadT();
    return (
      <Text style={styles.token}>
        {this.state.tokensCollected + this.state.pastTokens}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  token: {
    color: colors.white,
    top: 40,
    right: 10,
    fontSize: 20,
    position: "absolute"
  }
});
