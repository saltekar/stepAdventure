import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

import { story } from "../assets/story";
import BlinkCursor from "../components/BlinkCursor";
import DecisionButton from "../components/DecisionButton";
import colors from "../config/colors";

export default class StoryView extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "|",
      line: 0,
      button1Visible: false,
      button2Visible: false,
      button3Visible: false,
      button4Visible: false,
      button1Text: "",
      button2Text: "",
      button3Text: "",
      button4Text: "",
    };
  }

  setText = () => {
    // Stops when story ends (for testing)
    if (this.state.line >= story.length) return;
    let line = story[this.state.line];

    // Adds lines to story view component
    if (this.state.line == 0) {
      this.setState({ text: story[this.state.line] });
      this.incrementLine();
    } else if (line.startsWith("DECISION")) {
      let decisions = line.split(" ")[1];

      this.incrementLine();
      // Create 'decisions' number of buttons
      this.buttonsCreate(decisions);
    } else {
      this.setState({ text: this.state.text + "\n" + story[this.state.line] });

      // Counts line number
      this.incrementLine();
      console.log("diff" + this.state.line);
    }
  };

  incrementLine = () => {
    this.setState({
      line: this.state.line + 1,
    });
  };

  // Creates val number of buttons on screen for decisions
  buttonsCreate = (val) => {
    for (let i = 1; i < parseInt(val) + 1; i++) {
      this.incrementLine();
      this.setState({ ["button" + i + "Visible"]: true });
      this.setState({ ["button" + i + "Text"]: story[this.state.line] });
      this.incrementLine();
      console.log(this.state.line);
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
            <DecisionButton decisionText={this.state.button1Text} />
          ) : null}

          {/* Button 2 */}
          {this.state.button2Visible ? (
            <DecisionButton decisionText={this.state.button2Text} />
          ) : null}

          {/* Button 3 */}
          {this.state.button3Visible ? (
            <DecisionButton decisionText={this.state.button3Text} />
          ) : null}

          {/* Button 4 */}
          {this.state.button4Visible ? (
            <DecisionButton decisionText={this.state.button4Text} />
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
  story: {
    flex: 2,
    top: 80,
    left: 20,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 27,
  },
});
