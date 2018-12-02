/**
 * Returns the common letters (letters that are equal at the same position)
 * between two strings.
 * @param {string} line1
 * @param {string} line2
 * @returns {string}
 */
function getCommonLetters(line1, line2) {
  return [ ...line1 ].filter((letter, index) => line2[index] === letter).join('');
}

/**
 * The aim is simple: find the other ID (of length n) which has n - 1 letters
 * in common.
 * .flatMap works great for combining .filter and .map together.
 */
lines.flatMap((line1, index) => {
  const similar = lines.slice(index + 1).find(line2 => {
    return getCommonLetters(line1, line2).length === line1.length - 1;
  });
  return similar ? [ getCommonLetters(line1, similar) ] : [];
})[0];
