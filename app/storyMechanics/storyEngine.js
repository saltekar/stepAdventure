import { createCoverageMap } from "istanbul-lib-coverage";

class Graph {
  constructor(json) {
    this.data = json;
    createMap();
  }

  createMap() {}

  getData() {
    return this.data;
  }
}

export default Graph;
