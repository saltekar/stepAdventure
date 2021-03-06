/**
 * Purpose: This file contains logic for creating a graph of story nodes.
 * The story used in this game, which is a JSON file, is broken down into nodes,
 * and a graph is utilized for the sake of easily navigating between these nodes.
 */

import Node from "./storyNode";

class Graph {
  constructor(json) {
    this.data = json;
    this.createGraph();
    this.root = new Node();
  }

  // Loops through nodes and creates graph.
  createGraph() {
    let stack = [];
    let visited = [];

    // Create starting node
    let rootNode = new Node(
      this.data.root.content,
      "root",
      this.data.root.type
    );
    this.root = rootNode;
    rootNode.nodeMap["root"] = this.root;

    stack.push(rootNode);
    visited.push(rootNode.name);

    while (stack.length > 0) {
      // Removes first element
      let currentNode = stack.shift();

      // Check type
      if (currentNode.type === "DECISION") {
        // Add hiddon button if present
        let hiddenButton = this.data[[currentNode.name]].hiddenButton;
        if (hiddenButton != undefined) {
          let nextName = hiddenButton[1];
          // Check if nextName is in data
          if (this.data[[nextName]] != undefined) {
            // Check if nextName is in visited array
            if (!visited.includes(nextName)) {
              let nextNode = new Node(
                this.data[[nextName]].content,
                nextName,
                this.data[[nextName]].type
              );

              // content at index 0 in decision arr
              currentNode.hiddenButtonContent = hiddenButton[0];
              currentNode.hiddenButtonDist = hiddenButton[2];
              currentNode.hiddenButtonNext = nextNode;

              // Push this.data.nextName onto stack
              stack.push(nextNode);

              // Add to visited
              visited.push(nextNode.type);
            } else {
              // content at index 0 in decision arr
              currentNode.hiddenButtonContent = hiddenButton[0];
              currentNode.hiddenButtonDist = hiddenButton[2];
              currentNode.hiddenButtonNext = currentNode.nodeMap[nextName];
            }
          }
        }

        // Looping through decisions array
        let currentDecisions = this.data[[currentNode.name]].decisions;

        for (let i = 0; i < currentDecisions.length; i++) {
          let nextName = currentDecisions[i][1];
          // Check if nextName is in data
          if (this.data[[nextName]] != undefined) {
            // Check if nextName is in visited array
            if (!visited.includes(nextName)) {
              let nextNode = new Node(
                this.data[[nextName]].content,
                nextName,
                this.data[[nextName]].type
              );

              // content at index 0 in decision arr
              currentNode.addDecision(currentDecisions[i][0]);
              currentNode.addDistance(currentDecisions[i][2]);
              currentNode.addNode(nextNode);

              // Push this.data.nextName onto stack
              stack.push(nextNode);

              // Add to visited
              visited.push(nextNode.type);
            } else {
              // content at index 0 in decision arr
              currentNode.addDecision(currentDecisions[i][0]);
              currentNode.addDistance(currentDecisions[i][2]);
              currentNode.addNode(currentNode.nodeMap[nextName]);
            }
          }
        }
      } else if (currentNode.type === "CONTINUE") {
        // Create connection to next node
        let nextName = this.data[[currentNode.name]].nextNode; // String for next node name

        if (this.data[[nextName]] != undefined) {
          // Check if nextName is in visited array
          if (!visited.includes(nextName)) {
            let nextNode = new Node(
              this.data[[nextName]].content,
              nextName,
              this.data[[nextName]].type
            );

            // Chheck if reset
            if (this.data[[nextName]].reset == "TRUE") {
              currentNode.setReset(true);
            }

            currentNode.addNode(nextNode);

            // Push this.data.nextName onto stack
            stack.push(nextNode);

            // Add to visited
            visited.push(nextNode.name);
          } else {
            currentNode.addNode(currentNode.nodeMap[nextName]);

            if (this.data[[nextName]].reset == "TRUE") {
              currentNode.setReset(true);
            }
          }
        }
      }
    }
  }

  getData() {
    return this.data;
  }

  getRoot() {
    return this.root;
  }
}

export default Graph;
