import Node from "./storyNode";

class Graph {
  constructor(json) {
    this.data = json;
    this.createMap();
    this.root = new Node();
  }

  createMap() {
    let stack = [];
    let visited = [];
    console.log(this.data.root);
    stack.push(this.data.root);

    this.root = new Node(this.data.root);

    while (stack.length > 0) {
      // Removes first element
      let node = stack.shift();

      // Check type
      if (node.type === "DECISION") {
        // Looping through decisions array
        for (let i = 0; i < stack.length; i++) {
          let nextName = node.decisions[i][1];
          let nextNode = new Node(this.data.nextName); // MIGHT NOT WORK, using string to access json

          node.addNode(nextNode);

          // Check if nextName is in visited array

          // Push this.data.nextName onto stack
        }
      } else if (node.type === "CONTINUE") {
        // Create connection to next node
        // Check if nextName is in visited array
        // Push this.data.nextName onto stack
      } else {
        console.error("type error: UNKNOWN TYPE");
      }
    }
  }

  getData() {
    return this.data;
  }
}

export default Graph;
