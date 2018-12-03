/**
 * Return whether two proposed cuts are overlapping.
 * @param {number[]} ref
 * @param {number[]} claim
 * @returns {boolean}
 */
function isOverlapping(ref, claim) {
  return claim[2] + claim[4] > ref[2] &&
    claim[2] < ref[2] + ref[4] &&
    claim[1] + claim[3] > ref[1] &&
    claim[1] < ref[1] + ref[3];
}

/**
 * Parse a line of input into cut data.
 * @param {string} claim Line of input
 * @returns {number[]}
 */
function parseCut(claim) {
  return claim.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/).slice(1).map(Number);
}

const claims = input.split('\n').map(parseCut);

// Find the only cut that has *no* other overlapping cut.
const isolatedClaim = claims.find((ref, refIndex) => {
  const overlapped = claims.find((claim, index) => index !== refIndex && isOverlapping(ref, claim));
  return !overlapped;
});

isolatedClaim[0];
