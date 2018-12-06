const points = input.split('\n').map(line => line.split(', ').map(Number));
const xCoords = points.map(([ x ]) => x);
const yCoords = points.map(([ , y ]) => y);
const minX = Math.min(...xCoords);
const maxX = Math.max(...xCoords);
const minY = Math.min(...yCoords);
const maxY = Math.max(...yCoords);
const diffX = maxX - minX;
const diffY = maxY - minY;

// We track the points that have an infinite area here.
const infinitePoints = new Set();

// Return the nearest points of a given set of coordinates
function getNearest(x, y) {
  const distances = points.map(p => Math.abs(p[0] - x) + Math.abs(p[1] - y));
  const minDistance = Math.min(...distances);
  return points.filter((_, i) => distances[i] === minDistance);
}


/**
 * If a point is the nearest from some safe distance from the area that
 * includes all the points, then that point has an infinite area.
 */
for (let x = minX - diffX; x <= maxX + diffX; x++) {
  for (const point of getNearest(x, minY - diffY))
    infinitePoints.add(point);
  for (const point of getNearest(x, maxY + diffY))
    infinitePoints.add(point);
}
for (let y = minY - diffY; y <= maxY + diffY; y++) {
  for (const point of getNearest(minX - diffX, y))
    infinitePoints.add(point);
  for (const point of getNearest(maxX + diffX, y))
    infinitePoints.add(point);
}

const areas = new Array(points.length);

/**
 * Then we start counting the areas. It's basically brute force, but whatever.
 * I could advise a more mathematical approach, that this is enough.
 */
for (let x = minX - diffX; x <= maxX + diffX; x++)
  for (let y = minY - diffY; y <= maxY + diffY; y++) {
    const nearest = getNearest(x, y);
    if (nearest.length > 1) continue;
    const [ point ] = nearest;
    if (infinitePoints.has(point)) continue;
    const index = points.indexOf(point);
    areas[index] = (areas[index] || 0) + 1;
  }

Math.max(...areas.filter(Boolean));
