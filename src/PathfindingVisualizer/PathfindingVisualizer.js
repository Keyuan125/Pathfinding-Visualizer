import React, {Component} from 'react';
import Node from  './Node/Node';

import './PathfindingVisualizer.css';
import {dijkstra, getPath} from '../algorithms/dijkstra';

const DEFAULT_START_ROW = 5;
const DEFAULT_START_COL = 10;
const DEFAULT_TARGET_ROW = 5;
const DEFAULT_TARGET_COL = 40;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  // Naively create a 20X50 grid on the screen
  componentDidMount() {
    const grid = initializeGrid();
    this.setState({grid});

    const startNode = grid[DEFAULT_START_ROW][DEFAULT_START_COL];
    const finishNode = grid[DEFAULT_TARGET_ROW][DEFAULT_TARGET_COL];

    const visited = dijkstra(grid, startNode, finishNode);
    const path = getPath(finishNode);
    console.log(path);
  }

  render() {
    const {grid} = this.state;

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {isStart, isFinish} = node;
                return (
                  <Node
                    key={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                    test={'foo'}></Node>
                );
              })}
              </div>
          );
        })}
      </div>
    );
  }
}

// A me thod to create the graph
const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
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
