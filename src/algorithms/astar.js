// Implement the A Star Algorithm
import {getAllNodes, getPath, getNeighbors} from './dijkstra';


export function aStar(grid, startNode, finishNode) {
  startNode.distance = 0;
  startNode.heuristic = heuristic(startNode, finishNode);
  const visitedNodes = [];

  const frontier = [startNode];

  while (frontier.length !== 0) {

    sortNodesByCost(frontier);

    const previous = frontier.shift();
    // Might want to rewrite the getNeighbors() function to make sure it
    // works when adding 'weight' property
    const neighbors = getNeighbors(previous, grid);

    // Not sure if this works or not?
    for (const neighbor of neighbors) {
      if (neighbor.isWall === false) {
        neighbor.distance = previous.distance + neighbor.weight;
        neighbor.heuristic = heuristic(neighbor, finishNode);
        neighbor.previousNode = previous;
        if (!frontier.includes(neighbor)) {
          frontier.push(neighbor);
        }
      }
    }

    // If the closestNode is infinity, that means we are unable to reach the target
    if (previous.distance === Infinity) {
      return visitedNodes;
    }

    // If the closestNode is not Infinity, that means we are able to reach it
    else {
      previous.isVisited = true;
      visitedNodes.push(previous);
      if (previous === finishNode) {
        return visitedNodes;
      }
    }
  }
  // If we traverse all the nodes but we're still unable to find the target, return anyway.
  return visitedNodes;
}



// calcuate the heuristic of a given point,
// in this case, it's the Euclidean distance
// between this node and the finish node
function heuristic(node, finishNode) {
  const row1 = node.row;
  const col1 = node.col;
  const row2 = finishNode.row;
  const col2 = finishNode.col;
  const euclideanDistance = Math.sqrt((Math.pow(row1-row2,2) +  Math.pow(col1-col2,2)));
  return euclideanDistance;
}


function sortNodesByCost(unvisitedNodes) {
  unvisitedNodes.sort(function(node1, node2) {return (node1.heuristic+node1.distance) - (node2.heuristic+node2.distance)});
}
