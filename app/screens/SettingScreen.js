/**
 * Purpose: This file creates the setting screen that can be accessed from the Welcome(home) screen.
 */
import React from "react";
import { AsyncStorage } from "react-native";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import ActivityCenter from "../components/ActivityCenter";
import BackButton from "../components/BackButton";

import colors from "../config/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AwesomeAlert from "react-native-awesome-alerts";

export default class SettingScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      showAlert: false,
      showAlert2: false,
    };
  }
  clearStorage = async () => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      AsyncStorage.clear();
    }
    this.hideAlert();
    console.log("cleared from settings");
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      showAlert2: false,
    });
  };

  triggerAwesomeAlert = () => {
    this.setState({ showAlert2: true });
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/creepy.jpg")}
        style={styles.background}
      >
        <View style={styles.title}>
          <Text style={styles.settingsText}>Settings</Text>
        </View>

        <View style={styles.settingsContent}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.setState({ showAlert: true });
            }}
            style={styles.restartButton}
          >
            <Text style={styles.restartText}>Restart Game</Text>
          </TouchableOpacity>

          <AwesomeAlert
            contentContainerStyle={{ backgroundColor: colors.primary }}
            show={this.state.showAlert}
            showProgress={false}
            message={"Are you sure to want to restart?"}
            messageStyle={{ color: colors.white }}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No"
            confirmText="Yes"
            confirmButtonColor="#9DB4C0"
            cancelButtonColor="#9DB4C0"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.clearStorage();
            }}
            // onConfirmPressed={() => {
            //   this.setState({ showAlert: false });
            //   this.triggerAwesomeAlert();
            // }}
          />

          {/* <AwesomeAlert
            contentContainerStyle={{ backgroundColor: colors.primary }}
            show={this.state.showAlert2}
            showProgress={false}
            message={"Are you really really sure u wanna restart?"}
            messageStyle={{ color: colors.white }}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No"
            confirmText="Yes"
            confirmButtonColor="#9DB4C0"
            cancelButtonColor="#9DB4C0"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.clearStorage();
            }}
          /> */}
        </View>

        <BackButton nav={this.props.navigation} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  restartButton: {
    backgroundColor: colors.primary,
    height: 40,
    width: 155,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    left: 35,
    paddingLeft: 8,
    paddingRight: 8,
  },
  restartIcon: {
    flex: 1,
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  restartText: {
    fontSize: 20,
    color: colors.white,
  },
  settingsContent: {
    flex: 4,
  },
  settingsText: {
    fontSize: 38,
    color: colors.primary,
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
