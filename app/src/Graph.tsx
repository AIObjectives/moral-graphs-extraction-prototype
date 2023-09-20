import React, { useState } from 'react';
import calculateNodePositions from './positions';

interface Node {
  id: string;
  label: string;
  color?: string;
  hover?: string;
  score?: number
  quotes?: string[]
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
  width: number;
  height: number;
  positions: { [key: string]: { x: number, y: number } };
  setPositions: any
}


const Graph: React.FC<GraphProps> = ({ nodes, edges, width, height, positions, setPositions }) => {

  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [quotesNode, setQuotesNode] = useState<Node | null>(null);

  const posx = (node: Node) => positions[node.id].x * width
  const posy = (node: Node) => positions[node.id].y * height

  const handleNodeMouseDown = (node: Node, event: React.MouseEvent<SVGElement>) => {
    const { x, y } = positions[node.id]
    setDraggingNodeId(node.id);
    setDragOffset({
      x: event.clientX - x * width,
      y: event.clientY - y * height,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    if (draggingNodeId && dragOffset) {
      setPositions((positions: any) => ({
        ...positions, [draggingNodeId]: {
          x: (event.clientX - dragOffset.x) / width,
          y: (event.clientY - dragOffset.y) / height
        }
      }))
    }
  }

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const getNodeElements = () => {
    return nodes.map((node) => (
      <circle
        key={`node-${node.id}`}
        cx={posx(node)}
        cy={posy(node)}
        r={(node.score || 1) * 10}
        fill={colorPalette[parseInt(node.id.slice(1))]}
        onMouseDown={(e) => handleNodeMouseDown(node, e)}
        onMouseEnter={() => setQuotesNode(node)}
      />
    ));
  };

  const getEdgeElements = () => {
    return edges.map((edge, index) => {

      const sourceNode = nodes.find((node) => node.id === edge.source)!;
      const x1 = posx(sourceNode)
      const y1 = posy(sourceNode)
      const targetNode = nodes.find((node) => node.id === edge.target)!;
      const x2 = posx(targetNode)
      const y2 = posy(targetNode)

      const arrowSize = 20;
      const delta = 0.2
      const dist = (targetNode.score || 1) * 10
      const angle = Math.atan2(y2 - y1, x2 - x1);

      if (sourceNode && targetNode) {
        return (
          <g key={`edge-${index}`}>
            <line {... { x1, y1, x2, y2 }} stroke="lightgrey" />
            <line {... {
              x1: x2 - arrowSize * Math.cos(angle + delta),
              y1: y2 - arrowSize * Math.sin(angle + delta),
              x2: x2 - dist * Math.cos(angle),
              y2: y2 - dist * Math.sin(angle)
            }} stroke="lightgrey" />
            <line {... {
              x1: x2 - arrowSize * Math.cos(angle - delta),
              y1: y2 - arrowSize * Math.sin(angle - delta),
              x2: x2 - dist * Math.cos(angle),
              y2: y2 - dist * Math.sin(angle)
            }} stroke="lightgrey" />
          </g>
        );
      }

      return null;
    });
  };

  const getNodeLabelElements = () => {
    return nodes.map((node) => (
      <text
        key={`node-label-${node.id}`}
        x={posx(node)}
        y={posy(node)}
        dy={- 15}
        textAnchor="middle"
        fill={colorPalette[parseInt(node.id.slice(1))]}
        style={{ userSelect: "none", pointerEvents: 'none' }} >
        {node.label}
      </text >
    ));
  };

  const getEdgeLabelElements = () => {
    return edges.map((edge, index) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      const targetNode = nodes.find((node) => node.id === edge.target);

      if (sourceNode && targetNode) {
        const x = (posx(sourceNode) + posx(targetNode)) / 2;
        const y = (posy(sourceNode) + posy(targetNode)) / 2;

        return (
          <text
            key={`edge-label-${index}`}
            x={x}
            y={y}
            dy={-5}
            textAnchor="middle"
            fill={"lightgrey"}
            style={{ userSelect: "none", pointerEvents: 'none', fontSize: "60%" }} >
            {edge.label}
          </text>
        );
      }

      return null;
    });
  };


  return (
    <div>
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {getEdgeElements()}
        {getNodeElements()}
        {getEdgeLabelElements()}
        {getNodeLabelElements()}
      </svg>
      <div style={{
        margin: '13px auto', width: 600, fontSize: '80%', overflow: 'scroll',
        border: '3px solid lightgray', padding: '10px',
        borderRadius: '5px',
        borderColor: quotesNode ? colorPalette[parseInt(quotesNode.id.slice(1))] : 'lightgray',
        color: quotesNode ? 'black' : 'lightgray'
      }}>
        {quotesNode ? quotesNode.quotes?.join('...') : 'Hover over a node to see quotes'}
      </div>

    </div>
  );
};

const colorPalette = [
  '#E57373',  // Red
  '#F06292',  // Pink
  '#BA68C8',  // Purple
  '#9575CD',  // Deep Purple
  '#7986CB',  // Indigo
  '#64B5F6',  // Blue
  '#4FC3F7',  // Light Blue
  '#4DD0E1',  // Cyan
  '#81C784',  // Green
  '#AED581',  // Light Green
  '#FFD54F',  // Yellow
  '#FFB74D',  // Amber
  '#FF8A65',  // Deep Orange
  '#A1887F',  // Brown
  '#90A4AE',  // Blue Grey
  '#607D8B',  // Grey
  '#78909C',  // Dark Grey
  '#546E7A',  // Steel Grey
  '#455A64',  // Slate Grey
  '#37474F'   // Dark Slate Grey
];




export default Graph;
