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
  }

  addNode(node) {
    this.nextNodes.push(node);
    global.nodeMap[node.name] = node;
  }

  setReset(t) {
    this.reset = t;
  }

  addDistance(d) {
    this.decisionDistances.push(d);
  }

  addDecision(d) {
    this.decisions.push(d);
  }
}

export default Node;
