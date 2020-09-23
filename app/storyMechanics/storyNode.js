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

  addNode(node) {
    this.nextNodes.push(node);
    global.nodeMap[node.name] = node;
  }

  setReset(t) {
    this.reset = t;
  }

  getNextNodes() {
    return this.nextNodes;
  }

  setVisited(v) {
    this.visited = v;
  }

  addDistance(d) {
    this.decisionDistances.push(d);
  }

  addDecision(d) {
    this.decisions.push(d);
  }
}

export default Node;
