import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { AsyncStorage } from "react-native";

import Graph from "../storyMechanics/storyEngine";
import BlinkCursor from "../components/BlinkCursor";
import DecisionButton from "../components/DecisionButton";
import colors from "../config/colors";
import ProgressBar from "./ProgressBar";
import StepToken from "./StepToken";
import StepText from "./StepText";
import TokenButton from "./TokenButton";
import AwesomeAlert from "react-native-awesome-alerts";

export default class StoryView extends React.Component {
  constructor() {
    super();

    // Create map
    let JSON = require("../storyMechanics/storyContent.json");
    const graph = new Graph(JSON);
    graph.createMap();
    let root = graph.getRoot();

    //global variables
    global.line = 0;
    global.currentContent = [];
    global.node = root;
    global.text = "";
    global.tokenCnt = 0;
    global.decisionChosen = -1;

    this.state = {
      textVisible: false,

      blinkingCursor: true,

      button1Visible: false,
      button2Visible: false,
      button3Visible: false,
      button4Visible: false,

      button1Text: "",
      button2Text: "",
      button3Text: "",
      button4Text: "",

      dist1Visible: false,
      dist2Visible: false,
      dist3Visible: false,
      dist4Visible: false,

      decision1Distance: 0,
      decision2Distance: 0,
      decision3Distance: 0,
      decision4Distance: 0,

      tokenButton1Visible: false,
      tokenButton2Visible: false,
      tokenButton3Visible: false,
      tokenButton4Visible: false,

      barVisible: false,
      barTextVisible: false,
      barText: "",

      distanceChosen: 0,

      showAlert: false,
      showErrorAlert: false,

      tokens: 0
    };

    this.initialVals();
  }

  clearStorage = async () => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      AsyncStorage.clear();
    }

    console.log("cleared");
  };

  initialVals = async () => {
    try {
      // intialize line number on

      this.getData("line").then(currLine => {
        if (!isNaN(currLine)) {
          global.line = currLine;
        } else {
          this.setStorage("line", global.line);
        }
      });

      this.getData("node").then(currNode => {
        if (currNode != undefined) {
          global.node = currNode;
        } else {
          this.setStorage("node", global.node);
        }
      });

      this.getData("screenText").then(currText => {
        if (currText != null) {
          // Display text on screen
          global.text = currText;
          this.setState({ textVisible: true });

          global.currentContent = global.node.content.split("\n");
          this.setState({ blinkingCursor: false });
          let decisions = global.node.decisions;
          let distances = global.node.decisionDistances;

          // Display buttons
          if (
            global.node.type == "DECISION" &&
            global.line == global.currentContent.length
          ) {
            this.getData("barVisible").then(visible => {
              if (visible != null && visible == "true") {
                this.getData("decisionChosen").then(chosen => {
                  this.setState({ distanceChosen: distances[chosen - 1] });
                  this.setState({
                    ["button" + chosen + "Text"]: decisions[chosen - 1]
                  });
                  this.setState({
                    ["decision" + chosen + "Distance"]: distances[chosen - 1]
                  });
                  this.hideButtons(chosen);
                });
              } else {
                this.setStorage("barVisible", "false");
                this.setStorage("decisionChosen", -1);
                this.buttonsCreate(decisions, distances);
              }
            });
          }
        } else {
          this.setStorage("screenText", "");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  getData = async val => {
    try {
      if (val == "line") {
        const curLine = await AsyncStorage.getItem(val);
        return parseInt(curLine);
      } else if (val == "node") {
        const curNodeName = await AsyncStorage.getItem(val);
        return global.node.nodeMap[curNodeName];
      } else if (val == "screenText") {
        const currText = await AsyncStorage.getItem(val);
        return currText;
      } else if (val == "barVisible") {
        const visible = await AsyncStorage.getItem(val);
        return visible;
      } else if (val == "decisionChosen") {
        const chosen = await AsyncStorage.getItem(val);
        return parseInt(chosen);
      } else if (val == "tokens") {
        const tokens = await AsyncStorage.getItem(val);
        return parseInt(tokens);
      }
    } catch (err) {
      console.log(err);
    }
  };

  setText = () => {
    global.currentContent = global.node.content.split("\n");

    if (global.line >= global.currentContent.length) return;

    // Stops when story ends (for testing)
    let line = global.currentContent[global.line];

    // Text visible
    this.setState({ textVisible: true });

    // Adds lines to story view component
    if (global.line == 0 && global.node.name == "root") {
      global.text = global.currentContent[global.line];
      this.setStorage("screenText", global.text);
      this.incrementLine();
    } else {
      if (global.text == "") {
        global.text = global.currentContent[global.line];
      } else {
        global.text = global.text + "\n" + global.currentContent[global.line];
      }

      // Save text
      this.setStorage("screenText", global.text);

      // Disable blinking cursor decision next
      let nextLine = global.currentContent[global.line + 1];
      if (
        global.node.type == "DECISION" &&
        global.line == global.currentContent.length - 1
      ) {
        this.setState({ blinkingCursor: false });
        let decisions = global.node.decisions;
        let distances = global.node.decisionDistances;

        // Create 'decisions' number of buttons
        this.buttonsCreate(decisions, distances);
      }

      if (
        global.node.type == "CONTINUE" &&
        global.line == global.currentContent.length - 1 &&
        global.node.nextNodes.length > 0
      ) {
        global.node = global.node.nextNodes[0];
        this.setStorage("node", global.node);

        global.line = -1;
        this.setStorage("line", global.line);
      }

      this.incrementLine();
    }
  };

  setStorage = async (type, val) => {
    try {
      if (type == "line") {
        await AsyncStorage.setItem("line", val + "");
      } else if (type == "node") {
        await AsyncStorage.setItem("node", val.name + "");
      } else if (type == "screenText") {
        await AsyncStorage.setItem("screenText", val);
      } else if (type == "barVisible") {
        await AsyncStorage.setItem("barVisible", val);
      } else if (type == "decisionChosen") {
        await AsyncStorage.setItem("decisionChosen", val + "");
      } else if (type == "tokens") {
        await AsyncStorage.setItem("tokens", val + "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Increments current line number
  incrementLine() {
    global.line += 1;
    this.setStorage("line", global.line);
  }

  // Creates val number of buttons on screen for decisions
  buttonsCreate = (dec, dist) => {
    for (let i = 0; i < dec.length; i++) {
      this.setState({ ["button" + (i + 1) + "Visible"]: true });
      this.setState({ ["button" + (i + 1) + "Text"]: dec[i] });

      if (dist != undefined && dist[i] != 0) {
        console.log(dist[i]);
        this.setState({ ["decision" + (i + 1) + "Distance"]: dist[i] });
        this.setState({ ["dist" + (i + 1) + "Visible"]: true });
        this.setState({ ["tokenButton" + (i + 1) + "Visible"]: true });
      }
    }
  };

  // Hides buttons after decision made
  hideButtons = val => {
    for (let i = 1; i < 5; i++) {
      this.setState({ ["button" + i + "Visible"]: false });
      this.setState({ ["dist" + i + "Visible"]: false });
      this.setState({ ["tokenButton" + i + "Visible"]: false });
    }

    // check to display progress bar
    if (eval("this.state.decision" + val + "Distance") > 0) {
      this.setStorage("barVisible", "true");
      this.setStorage("decisionChosen", val);

      //display bar with circle on left
      this.setState({ blinkingCursor: false });
      this.setState({ barVisible: true });

      this.setState({ barText: eval("this.state.button" + val + "Text") });
      this.setState({ barTextVisible: true });
      this.setState({
        distanceChosen: eval("this.state.decision" + val + "Distance")
      });
      // this.setState({
      //   decisionChosen: val
      // });
      global.decisionChosen = val;
      return;
    }
    global.text = "";
    this.setStorage("screenText", global.text);

    this.setState({ blinkingCursor: true });
    this.setState({ textVisible: false });
    // Set next node
    global.node = global.node.nextNodes[val - 1];
    this.setStorage("node", global.node);

    global.line = 0;
    this.setStorage("line", global.line);
  };

  hideBar = () => {
    this.setState({ barVisible: false });
    this.setStorage("barVisible", "false");

    // set distances back to 0
    for (let i = 1; i < 5; i++) {
      this.setState({
        ["decision" + this.state.decisionChosen + "Distance"]: 0
      });
    }

    global.text = "";
    this.setStorage("screenText", global.text);

    this.setState({ blinkingCursor: true });
    this.setState({ textVisible: false });
    // Set next node
    global.node = global.node.nextNodes[global.decisionChosen - 1];
    this.setStorage("node", global.node);

    global.line = 0;
    this.setStorage("line", global.line);
  };

  tokenChosen = decisionDistance => {
    try {
      this.getData("tokens").then(tokenCnt => {
        if (tokenCnt < Math.floor(decisionDistance / 25)) {
          this.setState({ showErrorAlert: true });
        } else {
          this.setState({ showAlert: true });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  skipProgressBar = (decisionDist, decisionChos) => {
    this.hideAlert();
    this.setStorage("decisionChosen", decisionChos);
    global.decisionChosen = decisionChos;

    for (let i = 1; i < 5; i++) {
      this.setState({ ["button" + i + "Visible"]: false });
      this.setState({ ["dist" + i + "Visible"]: false });
      this.setState({ ["tokenButton" + i + "Visible"]: false });
    }
    try {
      this.getData("tokens").then(tokenCnt => {
        this.setStorage("tokens", tokenCnt - Math.floor(decisionDist / 25));
        console.log(tokenCnt - Math.floor(decisionDist / 25));
      });

      this.getData("tokens").then(tokenCont => {
        console.log(tokenCont + "  - count");
      });
    } catch (err) {
      console.log(err);
    }

    this.hideBar();
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const { showAlert } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={() => this.setText()}
      >
        <View style={styles.story}>
          {this.state.textVisible ? (
            <Text style={styles.text}>{global.text}</Text>
          ) : null}

          {this.state.blinkingCursor ? <BlinkCursor content="|" /> : null}
        </View>

        {!this.state.barVisible ? <StepToken /> : <StepText />}

        {/* {this.state.barVisible ?  : null} */}

        <View style={styles.buttons}>
          {/* Progress Bar */}
          {this.state.barVisible ? (
            <ProgressBar
              distance={this.state.distanceChosen}
              content={this.state.barText}
              hideBar={this.hideBar}
              showBar={true}
            />
          ) : null}

          <View>
            <View style={styles.decisionButtonsContainer}>
              {/* Button 1 */}
              {this.state.button1Visible ? (
                <DecisionButton
                  decisionText={this.state.button1Text}
                  onPress={() => this.hideButtons(1)}
                />
              ) : null}

              {this.state.tokenButton1Visible ? (
                <TokenButton
                  decisionCost={this.state.decision1Distance}
                  onPress={() => this.tokenChosen(this.state.decision1Distance)}
                />
              ) : null}

              <AwesomeAlert
                contentContainerStyle={{ backgroundColor: colors.primary }}
                show={showAlert}
                showProgress={false}
                // title=""
                message={
                  "Are you sure you want to spend " +
                  this.state.decision1Distance / 25 +
                  " step tokens?"
                }
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
                  this.skipProgressBar(this.state.decision1Distance, 1);
                }}
              />

              {/* Error Alert for lack of tokens */}

              <AwesomeAlert
                contentContainerStyle={{ backgroundColor: colors.primary }}
                show={this.state.showErrorAlert}
                showProgress={false}
                message={"You do not have enough tokens!"}
                messageStyle={{ color: colors.white }}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#9DB4C0"
                onConfirmPressed={() => {
                  this.setState({
                    showErrorAlert: false
                  });
                }}
              />
            </View>
            {this.state.dist1Visible ? (
              <Text style={styles.distText}>
                {"Distance: " + this.state.decision1Distance + " steps"}
              </Text>
            ) : null}
          </View>

          <View>
            {/* Button 2 */}
            {this.state.button2Visible ? (
              <DecisionButton
                decisionText={this.state.button2Text}
                onPress={() => this.hideButtons(2)}
              />
            ) : null}
            {this.state.dist2Visible ? (
              <Text style={styles.distText}>
                {"Distance: " + this.state.decision2Distance + " steps"}
              </Text>
            ) : null}
          </View>

          <View>
            {/* Button 3 */}
            {this.state.button3Visible ? (
              <DecisionButton
                decisionText={this.state.button3Text}
                onPress={() => this.hideButtons(3)}
              />
            ) : null}
            {this.state.dist3Visible ? (
              <Text style={styles.distText}>
                {"Distance: " + this.state.decision3Distance + " steps"}
              </Text>
            ) : null}
          </View>

          <View>
            {/* Button 4 */}
            {this.state.button4Visible ? (
              <DecisionButton
                decisionText={this.state.button4Text}
                onPress={() => this.hideButtons(4)}
              />
            ) : null}
            {this.state.dist4Visible ? (
              <Text style={styles.distText}>
                {"Distance: " + this.state.decision4Distance + " steps"}
              </Text>
            ) : null}
          </View>
        </View>
        <Button
          title="press me"
          color="white"
          onPress={() => this.clearStorage()}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  button: {
    width: "80%",
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  decisionButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  distText: {
    color: colors.white,
    fontSize: 15,
    alignSelf: "center"
  },
  story: {
    flex: 2,
    top: 80,
    left: 20,
    paddingRight: 25,
    flexDirection: "column"
  },
  text: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 27,
    flexWrap: "wrap"
  },
  token: {
    color: colors.white,
    top: 40,
    right: 10,
    fontSize: 20,
    position: "absolute"
  }
});
