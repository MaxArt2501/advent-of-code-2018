const points = input.split('\n').map(line => line.split(', ').map(Number));
const xCoords = points.map(([x]) => x);
const yCoords = points.map(([, y]) => y);
const minX = Math.min(...xCoords);
const maxX = Math.max(...xCoords);
const minY = Math.min(...yCoords);
const maxY = Math.max(...yCoords);
const diffX = maxX - minX;
const diffY = maxY - minY;

function getTotalDistance(x, y) {
  return points.reduce((sum, p) => sum + Math.abs(p[0] - x) + Math.abs(p[1] - y), 0);
}
const LIMIT = 10000;
let count = 0;
for (let x = minY; x <= maxY; x++)
  for (let y = minX; y <= maxX; y++) {
    const total = getTotalDistance(y, x);
    if (total < LIMIT) count++;
  }

count;
