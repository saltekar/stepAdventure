global.nodeMap = {};

class Node {
  constructor(content, name, type, cost) {
    this.content = content;
    this.nextNodes = [];
    this.name = name;
    this.type = type;
    this.decisions = [];
    this.nodeMap = global.nodeMap;
  }

  addNode(node) {
    this.nextNodes.push(node);
    global.nodeMap[node.name] = node;
  }

  addDecision(d) {
    this.decisions.push(d);
  }
}

export default Node;
