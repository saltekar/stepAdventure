import React from "react";
import { thistle } from "color-name";
import storyMap from "./storyText";

class Node {
  constructor(content, name) {
    this.name = name;
    this.content = content;
    this.nextNodes = [];
  }

  addNode(node) {
    this.nextNodes.push(node);
  }

  printNeigbors() {
    let arr = [];

    for (let x = 0; x < this.nextNodes.length; x++) {
      arr.push(this.nextNodes[x].name);
    }

    return this.name + " -> " + arr;
  }
}

export default Node;
