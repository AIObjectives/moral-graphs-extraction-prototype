interface Node {
  id: string;
  label: string;
}

interface Edge {
  source: string;
  target: string;
}

interface NodeWithPosition extends Node {
  x: number;
  y: number;
}

export default function calculateNodePositions(
  nodes: Node[],
  edges: Edge[],
  width: number,
  height: number
): NodeWithPosition[] {
  const k = 0.1; // Ideal edge length
  let temperature = 10; // Initial temperature
  const coolingFactor = 0.95; // Cooling factor

  const nodesWithPositions: NodeWithPosition[] = nodes.map((node) => ({
    ...node,
    x: Math.random() * width,
    y: Math.random() * height,
  }));

  function iterate() {
    for (let i = 0; i < nodesWithPositions.length; i++) {
      for (let j = 0; j < nodesWithPositions.length; j++) {
        if (i !== j) {
          const dx = nodesWithPositions[j].x - nodesWithPositions[i].x;
          const dy = nodesWithPositions[j].y - nodesWithPositions[i].y;
          const distance = Math.max(0.1, Math.sqrt(dx * dx + dy * dy));
          const force = (k * k) / distance;
          const fx = (force * dx) / distance;
          const fy = (force * dy) / distance;
          nodesWithPositions[i].x += fx;
          nodesWithPositions[i].y += fy;
          nodesWithPositions[j].x -= fx;
          nodesWithPositions[j].y -= fy;
        }
      }
    }

    for (const edge of edges) {
      const dx = getNodeById(edge.target).x - getNodeById(edge.source).x;
      const dy = getNodeById(edge.target).y - getNodeById(edge.source).y;
      const distance = Math.max(0.1, Math.sqrt(dx * dx + dy * dy));
      const force = (distance * distance) / k;
      const fx = (force * dx) / distance;
      const fy = (force * dy) / distance;
      getNodeById(edge.source).x += fx;
      getNodeById(edge.source).y += fy;
      getNodeById(edge.target).x -= fx;
      getNodeById(edge.target).y -= fy;
    }

    for (const node of nodesWithPositions) {
      const speed = Math.sqrt(node.x * node.x + node.y * node.y);
      const factor = speed / (speed + 1);
      node.x += (node.x / speed) * Math.min(speed, temperature) * factor;
      node.y += (node.y / speed) * Math.min(speed, temperature) * factor;

      // Ensure nodes stay within the bounding box
      node.x = Math.max(0, Math.min(node.x, width));
      node.y = Math.max(0, Math.min(node.y, height));
    }

    // Cool the system by reducing the temperature
    temperature *= coolingFactor;
  }

  function getNodeById(id: string): NodeWithPosition {
    return nodesWithPositions.find((node) => node.id === id)!;
  }

  // Repeat the iterations for a desired number of steps
  const numIterations = 100; // Adjust as needed
  for (let i = 0; i < numIterations; i++) {
    console.log(JSON.stringify(nodesWithPositions));
    iterate();
  }

  return nodesWithPositions;
}
