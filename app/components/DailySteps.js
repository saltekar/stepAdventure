import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  AsyncStorage
} from "react-native";
import { Pedometer } from "expo-sensors";
import { useNavigation, CommonActions } from "@react-navigation/native";
import StepToken from "../components/StepToken";

import colors from "../config/colors";

class DailySteps extends React.Component {
  constructor(props) {
    super(props);

    global.stepsPerToken = 25;

    this.state = {
      steps: 0,
      tokens: 0,
      subtraction: 0
    };

    this.initialize();
    this.getWalkingDataToday();
  }

  initialize() {
    try {
      this.loadS().then(sub => {
        if (!isNaN(sub)) {
          this.setState({ subtraction: sub });
        } else {
          this.saveS(sub);
        }
      });

      this.loadT().then(tok => {
        if (!isNaN(tok)) {
          this.setState({ tokens: tok });
        } else {
          this.saveT(this.state.tokens);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  getWalkingDataToday() {
    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(24, 0, 0, 0);

    end.setDate(end.getDate());
    start.setDate(start.getDate());

    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({
          steps: result.steps
        });
      },
      error => {
        this.setState({
          steps: "Could not get steps"
        });
      }
    );
  }

  stepsToTokens = () => {
    let varTokens = Math.floor(
      (this.state.steps - this.state.subtraction) / global.stepsPerToken
    );

    if (varTokens > 0) {
      this.setState(
        {
          tokens: this.state.tokens + varTokens,
          subtraction: this.state.subtraction + varTokens * global.stepsPerToken
        },
        function() {
          this.saveTokens();
        }.bind(this)
      );
    }
  };

  saveTokens = () => {
    this.saveT(this.state.tokens);
    this.saveS(this.state.subtraction);
  };

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

  saveS = async val => {
    try {
      await AsyncStorage.setItem("subtraction", val + "");
    } catch (err) {
      console.log(err);
    }
  };

  loadS = async () => {
    try {
      const steps = await AsyncStorage.getItem("subtraction");
      return parseInt(steps);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {}

  render() {
    this.getWalkingDataToday();
    const { navigation } = this.props;
    return (
      <View>
        <StepToken black="True" />
        {/* Title */}
        <View style={styles.heading}>
          <Text
            style={{
              fontSize: 80,
              color: "#253237",
              textAlign: "center",
              fontFamily: "Cochin-Bold",
              marginTop: 50
            }}
          >
            Step Adventure
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: "#253237",
              textAlign: "center",
              fontFamily: "Cochin",
              marginTop: 15
            }}
          >
            Project Sahaya
          </Text>
        </View>
        {/* Play Button */}
        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("StoryScreen");
            }}
            style={styles.actionButton}
          >
            <Text style={styles.buttonText2}>Play</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.steps}>
          {this.state.steps - this.state.subtraction}
        </Text>

        {/* Steps to Tokens button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.stepsToTokens();
          }}
          style={styles.stepsButton}
        >
          <Text style={styles.buttonText}>Steps &#8594;</Text>
          <Image
            style={styles.tokenImage}
            source={require("../assets/coin.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <DailySteps {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: colors.primary,
    height: 60,
    width: "40%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "60%"
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    right: 10
  },
  buttons: {
    alignItems: "center"
  },
  buttonText2: {
    color: colors.white,
    fontSize: 30
  },
  heading: {
    alignItems: "center",
    justifyContent: "center"
  },
  steps: {
    fontSize: 30,
    color: colors.white,
    alignSelf: "center",
    marginTop: "10%"
  },
  stepsButton: {
    backgroundColor: "#5C6B73",
    height: 50,
    width: "35%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
    alignSelf: "center"
  },
  tokenImage: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 15
  },
  tokenContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    left: 100
  },
  token: {
    color: colors.white,
    top: 45,
    right: 30,
    fontSize: 20,
    alignSelf: "flex-end"
  },
  tokenImage2: {
    width: 20,
    height: 21,
    alignSelf: "flex-end",
    top: 23,
    right: 10
  }
});
