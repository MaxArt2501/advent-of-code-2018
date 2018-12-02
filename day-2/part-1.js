/**
 * Yep, that's a higher-order function. It returns a function that can be used
 * with .filter
 * Another approach:
 * ```js
 * function countRepetitions(line, letter) {
 *   return line.split(letter).length - 1;
 * }
 * ```
 * It's nice, just not as efficient.
 *
 * @param {number} count
 * @returns {(line: string) => boolean}
 */
function hasMultiple(count) {
  return line => {
    const countMap = {};
    for (const letter of line) {
      countMap[letter] = (countMap[letter] || 0) + 1;
    }
    return Object.values(countMap).includes(count);
  };
}

const lines = input.split('\n');

const has2 = lines.filter(hasMultiple(2));
const has3 = lines.filter(hasMultiple(3));

has2.length * has3.length;
