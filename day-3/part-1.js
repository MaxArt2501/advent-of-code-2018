/**
 * The plan is simple: we store how many times every square inch of the fabric
 * is marked for cutting. Then we count how many of them have been marked more
 * than once.
 */

const SIZE = 1000;

/**
 * Using Uint8ClampedArray because a square inches *theorically* could be marked
 * more than 255 times... but we wouldn't care.
 */
const fabric = new Uint8ClampedArray(SIZE * SIZE);

function markFabric(claim) {
  const [, column, row, width, height] = claim.match(/^#\d+ @ (\d+),(\d+): (\d+)x(\d+)$/).map(Number);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (row + y) * 1000 + column + x;
      fabric[index] += 1;
    }
  }
}

input.split('\n').forEach(markFabric);

fabric.reduce((total, markCount) => total + (markCount > 1 ? 1 : 0), 0);
