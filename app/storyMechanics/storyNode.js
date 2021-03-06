/**
 * Purpose: This file creates the Node class, which is the building block of
 * the story graph. Each node contains story text, a list of decisions, and pointers to
 * next nodes in the story.
 */

global.nodeMap = {};

class Node {
  constructor(content, name, type, reset = false) {
    this.content = content;
    this.nextNodes = [];
    this.name = name;
    this.type = type;
    this.reset = reset;
    this.decisionDistances = [];
    this.decisions = [];
    this.nodeMap = global.nodeMap;
    this.visited = false;
    this.hiddenButtonContent = "";
    this.hiddenButtonNext = null;
    this.hiddenButtonDist = 0;
  }

  // Adds node to next nodes list.
  addNode(node) {
    this.nextNodes.push(node);
    global.nodeMap[node.name] = node;
  }

  // Sets true or false if node should reset text before it.
  setReset(t) {
    this.reset = t;
  }

  // Gets all nodes that story may lead to.
  getNextNodes() {
    return this.nextNodes;
  }

  // Sets visited value of node to true, if user visited node.
  setVisited(v) {
    this.visited = v;
  }

  // Adds number of tokens the decision costs.
  addDistance(d) {
    this.decisionDistances.push(d);
  }

  // Adds the text for the decision that's displayed.
  addDecision(d) {
    this.decisions.push(d);
  }
}

export default Node;
