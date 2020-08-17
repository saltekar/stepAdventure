import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { AsyncStorage } from "react-native";

import Graph from "../storyMechanics/storyEngine";
import BlinkCursor from "../components/BlinkCursor";
import DecisionButton from "../components/DecisionButton";
import colors from "../config/colors";
import ProgressBar from "./StepBank";

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

      barVisible: false,
      barTextVisible: false,
      barText: ""
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

          // Display buttons
          if (
            global.node.type == "DECISION" &&
            global.line == global.currentContent.length
          ) {
            this.setState({ blinkingCursor: false });
            let decisions = global.node.decisions;
            let distances = global.node.decisionDistances;

            // Create 'decisions' number of buttons
            this.buttonsCreate(decisions, distances);
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
        const curLine = await AsyncStorage.getItem("line");
        return parseInt(curLine);
      } else if (val == "node") {
        const curNodeName = await AsyncStorage.getItem("node");
        return global.node.nodeMap[curNodeName];
      } else if (val == "screenText") {
        const currText = await AsyncStorage.getItem("screenText");
        return currText;
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
        this.setState({ ["decision" + (i + 1) + "Distance"]: dist[i] });
        this.setState({ ["dist" + (i + 1) + "Visible"]: true });
      }
    }
  };

  // Hides buttons after decision made
  hideButtons = val => {
    for (let i = 1; i < 5; i++) {
      this.setState({ ["button" + i + "Visible"]: false });
      this.setState({ ["dist" + i + "Visible"]: false });
    }
    // check to display progress bar
    if (eval("this.state.dist" + val + "Visible")) {
      //display bar with circle on left
      this.setState({ blinkingCursor: false });
      this.setState({ barVisible: true });

      this.setState({ barText: eval("this.state.button" + val + "Text") });
      this.setState({ barTextVisible: true });
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

  render() {
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

        <View style={styles.buttons}>
          {/* Progress Bar */}
          {this.state.barVisible ? <ProgressBar /> : null}

          {/* Progress Bar Text */}
          {this.state.barTextVisible ? (
            <Text style={styles.text}>{this.state.barText}</Text>
          ) : null}
          <View>
            {/* Button 1 */}
            {this.state.button1Visible ? (
              <DecisionButton
                decisionText={this.state.button1Text}
                onPress={() => this.hideButtons(1)}
              />
            ) : null}

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
  }
});
