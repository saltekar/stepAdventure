import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

import { story } from "../assets/story";
import BlinkCursor from "../components/BlinkCursor";
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
      button4Visible: false
    };
  }

  setText = () => {
    // Stops when story ends (for testing)
    if (this.state.line >= story.length) return;
    let line = story[this.state.line];

    // Adds lines to story view component
    if (this.state.line == 0) {
      this.setState({ text: story[this.state.line] });
    } else if (line.startsWith("DECISION")) {
      let decisions = line.split(" ")[1];

      // Create 'decisions' number of buttons
      this.buttonsCreate(decisions);
    } else {
      this.setState({ text: this.state.text + "\n" + story[this.state.line] });
    }

    // Counts line number
    this.setState({ line: this.state.line + 1 });
  };

  // Creates val number of buttons on screen for decisions
  buttonsCreate = val => {
    for (let i = 1; i < parseInt(val) + 1; i++) {
      this.setState({ ["button" + i + "Visible"]: true });
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
            <TouchableOpacity style={styles.button} />
          ) : null}

          {/* Button 2 */}
          {this.state.button2Visible ? (
            <TouchableOpacity style={styles.button} />
          ) : null}

          {/* Button 3 */}
          {this.state.button3Visible ? (
            <TouchableOpacity style={styles.button} />
          ) : null}

          {/* Button 4 */}
          {this.state.button4Visible ? (
            <TouchableOpacity style={styles.button} />
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
