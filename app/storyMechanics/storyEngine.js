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

    stack.push(this.data.root);
    visited.push("root");

    while (stack.length > 0) {
      // Removes first element
      let jsonStory = stack.shift();

      let node = new Node(jsonStory.content);

      // Check type
      if (jsonStory.type === "DECISION") {
        // Looping through decisions array
        for (let i = 0; i < jsonStory.decisions.length; i++) {
          let nextName = jsonStory.decisions[i][1];
          console.log(nextName);

          // Check if nextName is in data
          console.log("\n\n\n" + this.data[[nextName]]);
          if (this.data[[nextName]] != undefined) {
            let nextNode = new Node(this.data[[nextName]].content); // MIGHT NOT WORK, using string to access json

            node.addNode(nextNode);

            // Check if nextName is in visited array
            if (!visited.includes(nextName)) {
              // Push this.data.nextName onto stack
              stack.push(this.data[[nextName]]);

              // Add to visited
              visited.push(nextName);
            }
          }
        }
      } else if (
        jsonStory.type === "CONTINUE" &&
        this.data[[jsonStory.nextNode]] != undefined
      ) {
        // Create connection to next node
        let nextName = jsonStory.nextNode;
        console.log(nextName);

        let nextNode = new Node(this.data[[nextName]].content); // MIGHT NOT WORK, using string to access json

        node.addNode(nextNode);

        // Check if nextName is in visited array
        if (!visited.includes(nextName)) {
          // Push this.data.nextName onto stack
          stack.push(this.data[[nextName]]);

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
