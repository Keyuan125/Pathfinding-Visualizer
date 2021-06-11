import React, {Component} from 'react';
import Node from  './Node/Node';

import './PathfindingVisualizer.css';
import {dijkstra, getPath} from '../algorithms/dijkstra';

const DEFAULT_START_ROW = 5;
const DEFAULT_START_COL = 10;
const DEFAULT_TARGET_ROW = 4;
const DEFAULT_TARGET_COL = 36;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  // Naively create a 20X50 grid on the screen
  componentDidMount() {
    const grid = initializeGrid();
    this.setState({grid});
  }


  animateDijkstra(visitedNodes, path) {
    for (let i = 1; i < visitedNodes.length; i++) {
      // If we didn't reach the end of the list,
      // then we keep rendering the visted nodes
      if (i !== visitedNodes.length-1) {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }, 10 * i);
      }

      // If we reach the end of the array, then we'll also animate the shortest path
      else {
        setTimeout(() => {
          this.animateShortestPath(path)} , 10 * i);
      }
    }
  }

  animateShortestPath(path) {
    for (let i = 1; i < path.length-1; i++) {
      setTimeout(() => {
        const node = path[i];
        document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortest-path';}, 50*i);
    }
  }


  visualizeDijkstra() {
    const {grid} = this.state;

    const startNode = grid[DEFAULT_START_ROW][DEFAULT_START_COL];
    const finishNode = grid[DEFAULT_TARGET_ROW][DEFAULT_TARGET_COL];

    const visited = dijkstra(grid, startNode, finishNode);
    const path = getPath(finishNode);
    this.animateDijkstra(visited, path);
  }


  render() {
    const {grid, mouseIsPressed} = this.state;


    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isStart, isFinish, isWall} = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}></Node>
                );
              })}
              </div>
          );
        })}
      </div>
    </>
    );
  }
}

// A me thod to create the graph
const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      let newNode = createNode(row,col);
      if (col > 12 && col < 26 && row < 19) newNode.isWall = true;
      currentRow.push(newNode);

    }
    grid.push(currentRow);
  }
  return grid;
};



// A method to create the node
// we need other properties for our algorithm
const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === DEFAULT_START_ROW && col === DEFAULT_START_COL,
    isFinish: row === DEFAULT_TARGET_ROW && col === DEFAULT_TARGET_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    weight: 1,
  };
};
