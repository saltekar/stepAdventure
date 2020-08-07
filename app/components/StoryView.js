import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

import { story } from "../assets/storyEngine";
import BlinkCursor from "../components/BlinkCursor";
import DecisionButton from "../components/DecisionButton";
import colors from "../config/colors";

export default class StoryView extends React.Component {
  constructor() {
    super();
    global.line = 0;
    this.state = {
      text: "|",
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
    if (global.line >= story.length) return;
    let line = story[global.line];

    // Adds lines to story view component
    if (global.line == 0) {
      this.setState({ text: story[global.line] });
      this.incrementLine();
    } else if (line.startsWith("DECISION")) {
      let decisions = line.split(" ")[1];

      this.incrementLine();
      // Create 'decisions' number of buttons
      this.buttonsCreate(decisions);
    } else {
      this.setState({ text: this.state.text + "\n" + story[global.line] });

      // Counts line number
      this.incrementLine();
    }
  };

  incrementLine = () => {
    global.line += 1;
  };

  // Creates val number of buttons on screen for decisions
  buttonsCreate = val => {
    for (let i = 1; i < parseInt(val) + 1; i++) {
      this.setState({ ["button" + i + "Visible"]: true });
      this.setState({ ["button" + i + "Text"]: story[global.line] });
      this.incrementLine();
      console.log(global.line);
    }
  };

  hideButtons = () => {
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
          <Text style={styles.text}>{this.state.text}</Text>
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
