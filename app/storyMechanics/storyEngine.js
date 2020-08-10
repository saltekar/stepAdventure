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
    let nodes = [];

    let rootNode = new Node(
      this.data.root.content,
      "root",
      this.data.root.type
    );
    this.root = rootNode;

    stack.push(rootNode);
    visited.push(rootNode.name);

    while (stack.length > 0) {
      // Removes first element
      let currentNode = stack.shift();

      // Check type
      if (currentNode.type === "DECISION") {
        // Looping through decisions array
        let currentDecisions = this.data[[currentNode.name]].decisions;

        for (let i = 0; i < currentDecisions.length; i++) {
          let nextName = currentDecisions[i][1];

          // Check if nextName is in data
          if (this.data[[nextName]] != undefined) {
            let nextNode = new Node(
              this.data[[nextName]].content,
              nextName,
              this.data[[nextName]].type
            ); // MIGHT NOT WORK, using string to access json

            // content at index 0 in decision arr
            currentNode.addDecision(currentDecisions[i][0]);
            currentNode.addNode(nextNode);

            // Check if nextName is in visited array
            if (!visited.includes(nextName)) {
              // Push this.data.nextName onto stack
              stack.push(nextNode);

              // Add to visited
              visited.push(nextName);
            }
          }
        }
      } else if (
        currentNode.type === "CONTINUE" &&
        this.data[[currentNode.name]].nextNode != undefined
      ) {
        // Create connection to next node
        let nextName = this.data[[currentNode.name]].nextNode; // String for next node name
        let nextNode = new Node(
          this.data[[nextName]].content,
          nextName,
          this.data[[nextName]].type
        );

        currentNode.addNode(nextNode);

        // Check if nextName is in visited array
        if (!visited.includes(nextName)) {
          // Push this.data.nextName onto stack
          stack.push(nextNode);

          // Add to visited
          visited.push(nextName);
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
