// Implement the Dijkstra's algorithm here


// Dijkstra's algorithm implementation
// Input: grid, startNode, finishNode
// Return: If we found the node, then return the path;
//         if we are unable to reach the nodes, ie. there is a wall, then we stop
export function dijkstra(grid, startNode, finishNode) {

  // At the beginning, the distance of the startNode is 0 by default
  startNode.distance = 0;
  // visitedNodes array stores all the nodes that are visited
  const visitedNodes = [];
  //
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length !== 0) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();
    // If the closestNode is infinity, that means we are unable to reach the target
    if (closestNode.distance === Infinity) return visitedNodes;

    // If the closestNode is not Infinity, that means we are able to reach it
    else {
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);

      updateUnvisitedNeighbors(closestNode, grid);
      if (closestNode === finishNode) return visitedNodes;
    }
  }
}




// Sort all the unvisited adjacent nodes, don't need to return anything
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort(function(node1, node2) {return node1.distance - node2.distance});
}



// take current node and the grid, update the unvisited node and update
// the distance, return nothing
export function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighborNodes = getNeighbors(node, grid);

  for (const neighborNode of unvisitedNeighborNodes) {
    const newDistance = neighborNode.weight + node.distance;
    if (newDistance < neighborNode.distance) {
      neighborNode.distance = newDistance;
      neighborNode.previousNode = node;
    }
  }
}


// take current node, and return it's unvisited neighbors
export function getNeighbors(node, grid) {
  const neighbors = [];
  const {row, col} = node;

  // Up:
  if (row - 1 >= 0) neighbors.push(grid[row-1][col]);
  // Down:
  if (row + 1 < grid.length) neighbors.push(grid[row+1][col]);
  // Left:
  if (col - 1 >= 0) neighbors.push(grid[row][col-1]);
  // Right:
  if (col + 1 < grid[0].length) neighbors.push(grid[row][col+1]);

  // We only want to consider the unvisited neighbors
  return neighbors.filter(neighbor => neighbor.isVisited === false, neighbor => neighbor.isWall === false);
}


// Return all the nodes (a list), and filter out all the wall nodes
export function getAllNodes(grid) {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes.filter(node => node.isWall === false);
}



export function getPath(finishNode) {
  const path = [];

  let currentNode = finishNode;
  while (currentNode !== null) {
    path.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path.reverse();
}
