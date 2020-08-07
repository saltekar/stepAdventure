import React from "react";
import { thistle } from "color-name";

let story = [
  "Felix... Felix! Wake up!",
  "We have to go NOW!",
  "You wake up slowly in a daze.",
  "DECISION 2",
  "HEY. who's there?",
  "Where am I?"
];

let d1 = ["Don't worry about who I am."];

let d2 = ["We in the middle of the forest."];

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

const A = new Node(story, "A");
const B = new Node(d1, "B");
const C = new Node(d2, "C");

A.addNode(B);
A.addNode(C);

console.log(B.printNeigbors());
