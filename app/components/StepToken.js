import React from "react";
import { StyleSheet, View, Text, AsyncStorage, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import colors from "../config/colors";

/*
Component for step token. Shows current amount of
step tokens user has.
*/
class StepToken extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: 0,
      first: true
    };

    this.initialize();
  }

  initialize() {
    this.loadT().then(tokensT => {
      if (!isNaN(tokensT)) {
        this.setState({ tokens: tokensT });
      } else {
        this.saveT(this.state.tokens);
      }
    });
  }

  saveT = async val => {
    try {
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

  componentDidMount() {}

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { isFocused } = this.props;

    if (isFocused) {
      this.initialize();
    }

    return (
      <View style={styles.tokenContainer}>
        {this.props.black == "True" ? (
          <Text style={styles.token}>{this.state.tokens}</Text>
        ) : (
          <Text style={styles.token2}>{this.state.tokens}</Text>
        )}

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
    color: "black",
    top: 45,
    right: 30,
    fontSize: 20,
    alignSelf: "flex-end"
  },
  token2: {
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

export default function(props) {
  const isFocused = useIsFocused();

  return <StepToken {...props} isFocused={isFocused} />;
}
