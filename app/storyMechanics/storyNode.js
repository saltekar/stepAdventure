class Node {
  constructor(content, name, type, cost) {
    this.content = content;
    this.nextNodes = [];
    this.name = name;
    this.type = type;
    this.decisions = [];
  }

  addNode(node) {
    this.nextNodes.push(node);
  }

  addDecision(d) {
    this.decisions.push(d);
  }
}

export default Node;
