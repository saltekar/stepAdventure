import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

import Node from "../assets/storyEngine";
import storyMap from "../assets/storyText";
import BlinkCursor from "../components/BlinkCursor";
import DecisionButton from "../components/DecisionButton";
import colors from "../config/colors";

export default class StoryView extends React.Component {
  constructor() {
    super();

    const D1 = new Node(storyMap["d1"], "d1");
    const S1 = new Node(storyMap["s1"], "s1");
    const S2 = new Node(storyMap["s2"], "s2");
    const D2 = new Node(storyMap["d2"], "d2");

    D1.addNode(S1);
    D1.addNode(S2);
    S1.addNode(D2);
    S2.addNode(D2);

    //global variables
    global.line = 0;
    global.story = D1.content;

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
    // Stops when story ends (for testing)
    if (global.line >= global.story.length) return;
    let line = global.story[global.line];

    // Text visible
    this.setState({ textVisible: true });

    // Adds lines to story view component
    if (global.line == 0) {
      this.setState({ text: global.story[global.line] });
      this.incrementLine();
    } else {
      this.setState({
        text: this.state.text + "\n" + global.story[global.line]
      });

      // Disable blinking cursor decision next
      let nextLine = global.story[global.line + 1];
      if (nextLine.startsWith("DECISION")) {
        this.setState({ blinkingCursor: false });
        let decisions = nextLine.split(" ")[1];

        // Double skip because looking one ahead for DECISION
        this.incrementLine();
        this.incrementLine();

        // Create 'decisions' number of buttons
        this.buttonsCreate(decisions);
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
    for (let i = 1; i < parseInt(val) + 1; i++) {
      this.setState({ ["button" + i + "Visible"]: true });
      this.setState({ ["button" + i + "Text"]: global.story[global.line] });
      this.incrementLine();
    }
  };

  // Hides buttons after decision made
  hideButtons = () => {
    this.setState({ text: "" });
    this.setState({ blinkingCursor: true });
    this.setState({ textVisible: false });

    for (let i = 1; i < 5; i++) {
      this.setState({ ["button" + i + "Visible"]: false });
    }
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
              onPress={() => this.hideButtons()}
            />
          ) : null}

          {/* Button 2 */}
          {this.state.button2Visible ? (
            <DecisionButton
              decisionText={this.state.button2Text}
              onPress={() => this.hideButtons()}
            />
          ) : null}

          {/* Button 3 */}
          {this.state.button3Visible ? (
            <DecisionButton
              decisionText={this.state.button3Text}
              onPress={() => this.hideButtons()}
            />
          ) : null}

          {/* Button 4 */}
          {this.state.button4Visible ? (
            <DecisionButton
              decisionText={this.state.button4Text}
              onPress={() => this.hideButtons()}
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
