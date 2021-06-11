import React, {Component} from 'react';
import Node from  './Node/Node';

import './PathfindingVisualizer.css';
import {dijkstra, getPath} from '../algorithms/dijkstra';
import {aStar} from '../algorithms/astar';

const DEFAULT_START_ROW = 5;
const DEFAULT_START_COL = 10;
const DEFAULT_TARGET_ROW = 10;
const DEFAULT_TARGET_COL = 15;

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

  handleMouseDown(row, col) {
    console.log("Mouse Down");
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
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

  animateAStar(visitedNodes, path) {
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

  visualizeAStar() {
    const {grid} = this.state;

    const startNode = grid[DEFAULT_START_ROW][DEFAULT_START_COL];
    const finishNode = grid[DEFAULT_TARGET_ROW][DEFAULT_TARGET_COL];
    const visited = aStar(grid, startNode, finishNode);
    const path = getPath(finishNode);
    this.animateAStar(visited, path);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;


    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeAStar()}>
          Visualize A Star Algorithm
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
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    onMouseUp={() => this.handleMouseUp()}></Node>
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
    heuristic: 0,
  };
};


const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
