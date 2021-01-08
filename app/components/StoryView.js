/**
 * Purpose: This file is responsible for functionality relating to the user playing through the story.
 * Using a generated map of story nodes, a user can press to view story text, then choose decisions that
 * further the story to the next "screen."
 */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { AsyncStorage } from "react-native";

import Graph from "../storyMechanics/storyEngine";
import BlinkCursor from "../components/BlinkCursor";
import DecisionButton from "../components/DecisionButton";
import colors from "../config/colors";
import StepToken from "./StepToken";
import AwesomeAlert from "react-native-awesome-alerts";

export default class StoryView extends React.Component {
  constructor() {
    super();

    let JSON = require("../storyMechanics/storyDialogue.json");
    const graph = new Graph(JSON);
    graph.createGraph();
    let root = graph.getRoot();

    //global variables
    global.line = 0;
    global.currentContent = [];
    global.node = root;
    global.text = "";
    global.tokenCnt = 0;
    global.decisionChosen = -1;
    global.reset = false;

    this.state = {
      textVisible: false,

      blinkingCursor: true,

      // Indicator variables for decision buttons. There are four decisions max.
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

      barVisible: false,
      barTextVisible: false,
      barText: "",

      distanceChosen: 0,

      showAlert: false,
      showErrorAlert: false,

      tokens: 0,
      token: false,
    };

    this.initialVals();
  }

  // Async method that clears all stored data. Allows user to restart game.
  clearStorage = async () => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      AsyncStorage.clear();
    }
    // EXISTS FOR TESTING PURPOSES
    console.log("cleared");
  };

  // Function to initialize line, node, and screen text everytime app is run.
  initialVals = async () => {
    try {
      // Keep track of current line number based on user progress.
      // If game has not yet started, initialize with root node.
      this.getData("line").then((currLine) => {
        if (!isNaN(currLine)) {
          global.line = currLine;
        } else {
          this.setStorage("line", global.line);
        }
      });

      // Keep track of current story node based on user progress.
      // If no story progress has been made, initialize with root node.
      this.getData("node").then((currNode) => {
        if (currNode != undefined) {
          global.node = currNode;
        } else {
          this.setStorage("node", global.node);
        }
      });

      // Keep track of current story text on screen based on user story progress.
      this.getData("screenText").then((currText) => {
        if (currText != null) {
          // Display text on screen
          global.text = currText;
          this.setState({ textVisible: true });

          // save current node content locally
          global.currentContent = global.node.content.split("\n");
          let decisions = global.node.decisions;
          let distances = global.node.decisionDistances;

          // Display buttons
          // If all node content is visible to the user and it is a decision node
          if (
            global.node.type == "DECISION" &&
            global.line == global.currentContent.length
          ) {
            this.setState({ blinkingCursor: false });

            // QUESTION: Why is progress bar still being referred to?
            this.getData("barVisible").then((visible) => {
              if (visible != null && visible == "true") {
                // Get decision chosen
                this.getData("decisionChosen").then((chosen) => {
                  // save distance of chosen decision
                  this.setState({ distanceChosen: distances[chosen - 1] });
                  // set button text with chosen decision's content
                  this.setState({
                    ["button" + chosen + "Text"]: decisions[chosen - 1],
                  });
                  // save distance of chosen decision
                  this.setState({
                    ["decision" + chosen + "Distance"]: distances[chosen - 1],
                  });
                  this.tokenChosen(distances[chosen - 1], chosen);
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

  // Function that gets a value from Async Storage, as specified by val
  getData = async (val) => {
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

  // Function
  setText = () => {
    global.currentContent = global.node.content.split("\n");

    // Exit function if all text of current content is displayed
    if (global.line >= global.currentContent.length) return;

    // If a node specified a reset, clear previously displayed text so current text can take its place
    if (global.reset == true) {
      global.text = "";
      this.setStorage("screenText", global.text);
      global.reset = false;
    }

    // Text visible
    this.setState({ textVisible: true });

    // Adds lines to story view component
    if (global.line == 0 && global.node.name == "root") {
      global.text = global.currentContent[global.line];
      this.setStorage("screenText", global.text);
      this.incrementLine();
    } else {
      // If text has been reset, make it equal to current content
      if (global.text == "") {
        global.text = global.currentContent[global.line];
      } else {
        // If there is existing text, add current content to it
        global.text = global.text + "\n" + global.currentContent[global.line];
      }

      // Save text
      this.setStorage("screenText", global.text);

      // Disable blinking cursor if all current content has been displayed
      // Display decision buttons
      if (
        global.node.type == "DECISION" &&
        global.line == global.currentContent.length - 1
      ) {
        this.setState({ blinkingCursor: false });
        let decisions = global.node.decisions;
        let distances = global.node.decisionDistances;

        // Create 'decisions' number of buttons
        this.buttonsCreate(decisions, distances);

        // Check if hidden button should be displayed
        this.displayHiddenButton();
      }

      // If all content of a CONTINUE node is displayed,
      // reset text and move on to its next node.
      if (
        global.node.type == "CONTINUE" &&
        global.line == global.currentContent.length - 1 &&
        global.node.nextNodes.length > 0
      ) {
        if (global.node.reset == true) {
          global.reset = true;
        }
        // Mark node as visited, for the sake of displaying hidden buttons later.
        global.node.setVisited(true);
        global.node = global.node.nextNodes[0];
        this.setStorage("node", global.node);

        global.line = -1;
        this.setStorage("line", global.line);
      }

      this.incrementLine();
    }
  };

  // This function stores data, specified as val, in Async Storage
  // using the specified type.
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

  // This function creates buttons for each decision with its corresponding distance.
  buttonsCreate = (dec, dist) => {
    // length of the decisions array == number of buttons to create
    for (let i = 0; i < dec.length; i++) {
      this.setState({ ["button" + (i + 1) + "Visible"]: true });
      this.setState({ ["button" + (i + 1) + "Text"]: dec[i] });

      this.setState({ ["decision" + (i + 1) + "Distance"]: dist[i] });
      this.setState({ ["dist" + (i + 1) + "Visible"]: true });
    }
  };

  // Displays hidden button if all next nodes visited
  displayHiddenButton = () => {
    if (global.node.hiddenButtonContent == undefined) return;

    let visitedCount = 0;
    for (let i = 0; i < global.node.nextNodes.length; i++) {
      if (global.node.nextNodes[i].visited == true) {
        visitedCount += 1;
      }
    }

    // Display hidden button
    if (visitedCount == global.node.nextNodes.length) {
      this.setState({ ["button" + 4 + "Visible"]: true });
      this.setState({
        ["button" + 4 + "Text"]: global.node.hiddenButtonContent,
      });

      // Display dist if present
      if (global.node.hiddenButtonDist != 0) {
        this.setState({
          ["decision" + 4 + "Distance"]: global.node.hiddenButtonDist,
        });
        this.setState({ ["dist" + 4 + "Visible"]: true });
      }

      // Hidden button can be 4th, 3rd, and 2nd option in this case
      global.node.nextNodes.push(global.node.hiddenButtonNext);
      global.node.nextNodes.push(global.node.hiddenButtonNext);
      global.node.nextNodes.push(global.node.hiddenButtonNext);
    }
  };

  // This function resets decision distances to 0, clears the screen from current content,
  // and progresses the user to the next story node.
  //
  // NOTE: function was originally created to execute after a
  // progress bar for steps was completed, BUT the progress bar feature has been
  // removed so this function executes everytime a user buys a decision with tokens
  hideBar = () => {
    // DONT NEED THIS RIGHT?
    this.setState({ barVisible: false });
    this.setStorage("barVisible", "false");

    // Set distances back to 0
    for (let i = 1; i < 5; i++) {
      this.setState({
        ["decision" + this.state.decisionChosen + "Distance"]: 0,
      });
    }

    // Clear screen text
    global.text = "";
    this.setStorage("screenText", global.text);

    this.setState({ blinkingCursor: true });
    this.setState({ textVisible: false });

    // Mark the current node as visited
    global.node.setVisited(true);

    // Replace current node with next node
    global.node = global.node.nextNodes[global.decisionChosen - 1];

    this.setStorage("node", global.node);

    global.line = 0;
    this.setStorage("line", global.line);
  };

  // Function that allows a user to progress in the story by using tokens
  // Shows an error message to user if not enough tokens are available.
  tokenChosen = (decisionDistance, val) => {
    try {
      this.getData("tokens").then((tokenCnt) => {
        if (tokenCnt < decisionDistance) {
          this.setState({ showErrorAlert: true });
        } else {
          this.skipProgressBar(decisionDistance, val);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Function that clears currently displayed content and buttons,
  // and prepares for the next story node to be displayed.
  // Also updates a user's token count based on the cost of the chosen decision.
  skipProgressBar = (decisionDist, decisionChos) => {
    this.hideAlert();
    this.setStorage("decisionChosen", decisionChos);
    global.decisionChosen = decisionChos;

    // Removes all buttons and associated distances from screen.
    for (let i = 1; i < 5; i++) {
      this.setState({ ["button" + i + "Visible"]: false });
      this.setState({ ["dist" + i + "Visible"]: false });
    }
    try {
      // Gets a user's token count.
      this.getData("tokens").then((tokenCnt) => {
        // Update token count based how many were just used.
        this.setStorage("tokens", tokenCnt - decisionDist);
        this.setState({ token: true });
        this.setState({ token: false });
      });
    } catch (err) {
      console.log(err);
    }
    // clear the rest of the screen and
    this.hideBar();
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
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
        <StepToken />
        <View style={styles.story}>
          {this.state.textVisible ? (
            <Text style={styles.text}>{global.text}</Text>
          ) : null}

          {this.state.blinkingCursor ? <BlinkCursor content="|" /> : null}
        </View>

        {/* Decision buttons portion of screen */}
        <View style={styles.buttons}>
          <View>
            <View style={styles.decisionButtonsContainer}>
              {/* Button 1 */}
              {this.state.button1Visible ? (
                <DecisionButton
                  decisionCost={this.state.decision1Distance}
                  decisionText={this.state.button1Text}
                  onPress={() =>
                    this.tokenChosen(this.state.decision1Distance, 1)
                  }
                />
              ) : null}

              {/* Error Alert for lack of tokens */}
              <AwesomeAlert
                contentContainerStyle={{ backgroundColor: colors.primary }}
                show={this.state.showErrorAlert}
                showProgress={false}
                message={"You do not have enough tokens!"}
                messageStyle={{ color: colors.white }}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#9DB4C0"
                onConfirmPressed={() => {
                  this.setState({
                    showErrorAlert: false,
                  });
                }}
              />
            </View>
            {this.state.button1Visible ? (
              <View style={styles.costBox}>
                <Text style={styles.distText}>
                  {"Cost: " + Math.floor(this.state.decision1Distance)}
                </Text>
                <Image
                  style={styles.tokenImage}
                  source={require("../assets/coin.png")}
                />
              </View>
            ) : null}
          </View>

          <View>
            <View style={styles.decisionButtonsContainer}>
              {/* Button 2 */}
              {this.state.button2Visible ? (
                <DecisionButton
                  decisionText={this.state.button2Text}
                  onPress={() =>
                    this.tokenChosen(this.state.decision2Distance, 2)
                  }
                />
              ) : null}

              {/* Error Alert for lack of tokens */}
              <AwesomeAlert
                contentContainerStyle={{ backgroundColor: colors.primary }}
                show={this.state.showErrorAlert}
                showProgress={false}
                message={"You do not have enough tokens!"}
                messageStyle={{ color: colors.white }}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#9DB4C0"
                onConfirmPressed={() => {
                  this.setState({
                    showErrorAlert: false,
                  });
                }}
              />
            </View>
            {this.state.button2Visible ? (
              <View style={styles.costBox}>
                <Text style={styles.distText}>
                  {"Cost: " + Math.floor(this.state.decision2Distance)}
                </Text>
                <Image
                  style={styles.tokenImage}
                  source={require("../assets/coin.png")}
                />
              </View>
            ) : null}
          </View>

          <View>
            <View style={styles.decisionButtonsContainer}>
              {/* Button 3 */}
              {this.state.button3Visible ? (
                <DecisionButton
                  decisionText={this.state.button3Text}
                  onPress={() =>
                    this.tokenChosen(this.state.decision3Distance, 3)
                  }
                />
              ) : null}

              {/* Error Alert for lack of tokens */}
              <AwesomeAlert
                contentContainerStyle={{ backgroundColor: colors.primary }}
                show={this.state.showErrorAlert}
                showProgress={false}
                message={"You do not have enough tokens!"}
                messageStyle={{ color: colors.white }}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#9DB4C0"
                onConfirmPressed={() => {
                  this.setState({
                    showErrorAlert: false,
                  });
                }}
              />
            </View>
            {this.state.button3Visible ? (
              <View style={styles.costBox}>
                <Text style={styles.distText}>
                  {"Cost: " + Math.floor(this.state.decision3Distance)}
                </Text>
                <Image
                  style={styles.tokenImage}
                  source={require("../assets/coin.png")}
                />
              </View>
            ) : null}
          </View>

          <View>
            <View style={styles.decisionButtonsContainer}>
              {/* Button 4 */}
              {this.state.button4Visible ? (
                <DecisionButton
                  decisionText={this.state.button4Text}
                  onPress={() =>
                    this.tokenChosen(this.state.decision4Distance, 4)
                  }
                />
              ) : null}

              {/* Error Alert for lack of tokens */}
              <AwesomeAlert
                contentContainerStyle={{ backgroundColor: colors.primary }}
                show={this.state.showErrorAlert}
                showProgress={false}
                message={"You do not have enough tokens!"}
                messageStyle={{ color: colors.white }}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#9DB4C0"
                onConfirmPressed={() => {
                  this.setState({
                    showErrorAlert: false,
                  });
                }}
              />
            </View>
            {this.state.button4Visible ? (
              <View style={styles.costBox}>
                <Text style={styles.distText}>
                  {"Cost: " + Math.floor(this.state.decision4Distance)}
                </Text>
                <Image
                  style={styles.tokenImage}
                  source={require("../assets/coin.png")}
                />
              </View>
            ) : null}
          </View>
        </View>
        <Button
          title="clear"
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
    justifyContent: "space-evenly",
  },
  button: {
    width: "80%",
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  costBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  decisionButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  distText: {
    color: colors.white,
    fontSize: 15,
    alignSelf: "center",
  },
  story: {
    flex: 2,
    top: 40,
    left: 20,
    paddingRight: 25,
    flexDirection: "column",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 25,
    flexWrap: "wrap",
  },
  token: {
    color: colors.white,
    top: 40,
    right: 10,
    fontSize: 20,
    position: "absolute",
  },
  tokenImage: {
    width: 18,
    height: 19,
  },
});
