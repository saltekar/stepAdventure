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

const D1 = new Node(storyMap["d1"], "d1");
const S1 = new Node(storyMap["s1"], "s1");
const S2 = new Node(storyMap["s2"], "s2");
const D2 = new Node(storyMap["d2"], "d2");

D1.addNode(S1);
D1.addNode(S2);
S1.addNode(D2);
S2.addNode(D2);

console.log(D1.printNeigbors());
