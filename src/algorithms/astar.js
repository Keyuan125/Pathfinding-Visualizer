// Implement the A Star Algorithm
import {getAllNodes, getPath, getNeighbors} from 'dijkstra';


export function aStar(grid, startNode, finishNode) {
  startNode.distance = 0;

  const visitedNodes = [startNode];

  const frontier = [startNode];

  while (frontier.length !== 0) {

    sortNodesByCost(frontier);

    const previousNode = frontier.shift();
    // Might want to rewrite the getNeighbors() function to make sure it
    // works when adding 'weight' property
    const neighbors = getNeighbors(previousNode, grid);

    // Not sure if this works or not?
    for (const neighbor of neighbors) {
      neighbor.distance = previousNode.distance + neighbor.weight;
      neighbor.heuristic = heuristic(neighbor, finishNode);
      neighbor.previousNode = previsouNode;
      frontier.push(neighbor);
      visitedNodes.push(neighbor);
    }

    // If the closestNode is infinity, that means we are unable to reach the target
    if (previousNode.distance === Infinity) return visitedNodes;

    // If the closestNode is not Infinity, that means we are able to reach it
    else {
      previousNode.isVisited = true;
      updateUnvisitedNeighbors(closestNode, grid);
      if (previousNode === finishNode) return visitedNodes;
    }
  }
}



// calcuate the heuristic of a given point,
// in this case, it's the Euclidean distance
// between this node and the finish node
function heuristic(node, finishNode) {
  const {row1, col1} = node1;
  const {row2, col2} = finishNode;

  const euclideanDistance = Math.sqrt((Math.pow(row1-row2,2) +  Math.pow(col1-col2,2)));

  return euclideanDistance;
}


function sortNodesByCost(unvisitedNodes) {
  unvisitedNodes.sort(function(node1, node2) {return (node1.heuristic+node1.distance) - (node2.heuristic+node2.distance)});
}
