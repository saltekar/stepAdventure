import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Image
} from "react-native";
import { Pedometer } from "expo-sensors";

import colors from "../config/colors";

export default class StepToken extends React.Component {
  constructor(props) {
    super(props);

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

    this.saveP(-1);
  };

  tokenLoad = async () => {
    try {
      this.loadT().then(tokens => {
        if (!isNaN(tokens)) {
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

  saveP = async val => {
    try {
      await AsyncStorage.setItem("propToken", val + "");
    } catch (err) {
      console.log(err);
    }
  };

  loadP = async () => {
    try {
      const steps = await AsyncStorage.getItem("propToken");
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

    return (
      <View style={styles.tokenContainer}>
        <Text style={styles.token}>
          {this.state.tokensCollected + this.state.pastTokens}
        </Text>
        <Image
          style={styles.tokenImage}
          source={require("../assets/coin.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tokenContainer: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  token: {
    color: colors.white,
    top: 45,
    right: 30,
    fontSize: 20,
    alignSelf: "flex-end"
  },
  tokenImage: {
    width: 20,
    height: 21,
    alignSelf: "flex-end",
    top: 23,
    right: 10
  }
});
