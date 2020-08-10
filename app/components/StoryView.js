import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

import Graph from "../storyMechanics/storyEngine";
import BlinkCursor from "../components/BlinkCursor";
import DecisionButton from "../components/DecisionButton";
import colors from "../config/colors";

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
    global.node = root;
    global.currentContent = [];

    this.state = {
      text: "",
      textVisible: false,
      blinkingCursor: true,
      button1Visible: false,
      button2Visible: false,
      button3Visible: false,
      button4Visible: false,
      button1Text: "",
      button2Text: "",
      button3Text: "",
      button4Text: ""
    };
  }

  setText = () => {
    global.currentContent = global.node.content.split("\n");

    if (global.line >= global.currentContent.length) return;

    // Stops when story ends (for testing)
    let line = global.currentContent[global.line];

    // Text visible
    this.setState({ textVisible: true });

    // Adds lines to story view component
    if (global.line == 0 && global.node.name == "root") {
      this.setState({ text: global.currentContent[global.line] });
      this.incrementLine();
    } else {
      if (this.state.text == "") {
        this.setState({ text: global.currentContent[global.line] });
      } else {
        this.setState({
          text: this.state.text + "\n" + global.currentContent[global.line]
        });
      }

      // Disable blinking cursor decision next
      let nextLine = global.currentContent[global.line + 1];
      if (
        global.node.type == "DECISION" &&
        global.line == global.currentContent.length - 1
      ) {
        this.setState({ blinkingCursor: false });
        let decisions = global.node.decisions;

        // Create 'decisions' number of buttons
        this.buttonsCreate(decisions);
      }

      if (
        global.node.type == "CONTINUE" &&
        global.line == global.currentContent.length - 1
      ) {
        global.node = global.node.nextNodes[0];
        global.line = -1;
      }

      this.incrementLine();
    }
  };

  // Increments current line number
  incrementLine = () => {
    global.line += 1;
  };

  // Creates val number of buttons on screen for decisions
  buttonsCreate = val => {
    for (let i = 0; i < val.length; i++) {
      this.setState({ ["button" + (i + 1) + "Visible"]: true });
      this.setState({ ["button" + (i + 1) + "Text"]: val[i] });
    }
  };

  // Hides buttons after decision made
  hideButtons = val => {
    this.setState({ text: "" });
    this.setState({ blinkingCursor: true });
    this.setState({ textVisible: false });

    for (let i = 1; i < 5; i++) {
      this.setState({ ["button" + i + "Visible"]: false });
    }

    // Set next node
    global.node = global.node.nextNodes[val - 1];
    global.line = 0;
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
            <Text style={styles.text}>{this.state.text}</Text>
          ) : null}

          {this.state.blinkingCursor ? <BlinkCursor content="|" /> : null}
        </View>

        <View style={styles.buttons}>
          {/* Button 1 */}
          {this.state.button1Visible ? (
            <DecisionButton
              decisionText={this.state.button1Text}
              onPress={() => this.hideButtons(1)}
            />
          ) : null}

          {/* Button 2 */}
          {this.state.button2Visible ? (
            <DecisionButton
              decisionText={this.state.button2Text}
              onPress={() => this.hideButtons(2)}
            />
          ) : null}

          {/* Button 3 */}
          {this.state.button3Visible ? (
            <DecisionButton
              decisionText={this.state.button3Text}
              onPress={() => this.hideButtons(3)}
            />
          ) : null}

          {/* Button 4 */}
          {this.state.button4Visible ? (
            <DecisionButton
              decisionText={this.state.button4Text}
              onPress={() => this.hideButtons(4)}
            />
          ) : null}
        </View>
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
  story: {
    flex: 2,
    top: 80,
    left: 20
  },
  text: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 27
  }
});
