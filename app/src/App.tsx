import React from 'react';
import GraphViz from './Graph';
import './App.css';
import graph_deo from './data/graphs_deontological.json'
import graph_uti from './data/graphs_utilitarian.json'


const width = 1000
const height = 300

const initPos = (g: any) => {
  const pos = {}
  g[0].clean_list.forEach((node: any, i: number) => {
    g[`N${i}`] = { x: Math.random(), y: 0.1 + 0.9 * Math.random() }
  })
  return g
}

const Column = ({ label, graph }: { label: string, graph: any }) => {
  const [positions, setPositions] = React.useState(initPos(graph))
  return (
    <div>
      {graph.map(({ interviewee, nodes, edges }: any, i: number) => <div>
        <h1 style={{ marginTop: '50px' }}>{interviewee}</h1>
        <h3>({label})</h3>
        <GraphViz
          key={i}
          {...{ nodes, width, height, edges, positions, setPositions }}></GraphViz>
      </div>)}
    </div >
  );
}


function App() {
  const [positions, setPositions] = React.useState(initPos(graph_deo))
  return (
    <div className="App">
      <Column label="Deontological Ethics" graph={graph_deo} />
      <Column label="Utilitarian Ethics" graph={graph_uti} />
    </div >
  );
}

export default App;
