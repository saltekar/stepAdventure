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
import { useNavigation } from "@react-navigation/native";
import StepToken from "../components/StepToken";

import colors from "../config/colors";

/*
Shows the daily step count for the user. 
Also, gives a button that translates user steps into
step tokens that can be used to progress story.
*/
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

  // Initializes tokens based on async storage.
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

  // Gets today's step count
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

  /*
  Translates the number of steps into tokens. While
  also showing correct number of steps by keeping track
  of steps translated with 'subtraction'.
  */
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

  render() {
    // Continously running to keep step count updated
    this.getWalkingDataToday();
    const { navigation } = this.props;

    return (
      <View style={styles.background}>
        <StepToken black="True" />
        {/* Title */}
        <View style={styles.heading}>
          <Text
            style={styles.title}
            adjustsFontSizeToFit={true}
            numberOfLines={2}
          >
            Step Adventure
          </Text>
          <Text style={styles.subtitle}>Project Sahaya</Text>
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

        {/* Steps to Tokens button */}
        <View style={styles.steps2tokens}>
          <Text style={styles.steps}>
            {this.state.steps - this.state.subtraction}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.stepsToTokens();
            }}
            style={styles.stepsButton}
          >
            <Text style={styles.buttonText}>Steps &#8594; </Text>
            <Image
              style={styles.tokenImage}
              source={require("../assets/coin.png")}
            />
          </TouchableOpacity>
        </View>

        {/* Activity Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("ActivityScreen")}
          style={styles.activityButton}
        >
          <Image
            style={styles.walkingPerson}
            source={require("../assets/activity-person.png")}
          />
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SettingScreen")}
          style={styles.settingButton}
        >
          <Image
            style={styles.settingsIcon}
            source={require("../assets/settingsIcon.png")}
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
    marginTop: "20%"
  },
  activityButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    bottom: 5,
    left: 5
  },
  background: {
    flex: 1
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    right: 10
  },
  buttons: {
    flex: 1,
    alignItems: "center"
  },
  buttonText2: {
    color: colors.white,
    fontSize: 30
  },
  heading: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  settingButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    bottom: 5,
    right: 5
  },
  steps: {
    fontSize: 30,
    color: colors.white,
    alignSelf: "center",
    marginTop: "14%",
    marginBottom: "2%"
  },
  stepsButton: {
    backgroundColor: "#5C6B73",
    height: 50,
    width: "35%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  steps2tokens: {
    flex: 1.5
  },
  settingsIcon: {
    aspectRatio: 0.6,
    resizeMode: "contain"
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
  },
  title: {
    fontSize: 80,
    color: "#253237",
    textAlign: "center",
    fontFamily: "Cochin-Bold",
    marginTop: 50
  },
  subtitle: {
    fontSize: 30,
    color: "#253237",
    textAlign: "center",
    fontFamily: "Cochin",
    marginTop: 15
  },
  walkingPerson: {
    flex: 1,
    aspectRatio: 0.6,
    resizeMode: "contain"
  }
});
