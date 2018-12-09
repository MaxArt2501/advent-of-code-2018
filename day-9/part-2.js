const [ players, marbles ] = input.split(/\D+/).map(Number);
const scores = new Uint32Array(players);

function insertMarble(previous, value) {
  const marble = { value, previous, next: previous.next };
  previous.next = marble;
  marble.next.previous = marble;
  return marble;
}
function removeMarble(marble) {
  marble.previous.next = marble.next;
  marble.next.previous = marble.previous;
  // To make it GC'ed, but whatever.
  Object.assign(marble, { next: null, previous: null });
}

/**
 * The previous solution wasn't efficient because we had to move a lot of data,
 * especially for the last moves. On the other have, we don't need fast
 * array indexing, since we're moving by a couple of positions around...
 * So here we are, with linked nodes. Much faster, even beyond my expectations.
 */
let current = { value: 0 };
Object.assign(current, { next: current, previous: current });

for (let value = 1; value <= marbles * 100; value++) {
  if (value % 23) {
    current = insertMarble(current.next, value);
  } else {
    const player = value % players;
    let score = value;
    for (let i = 0; i < 6; i++) {
      current = current.previous;
    }
    score += current.previous.value;
    removeMarble(current.previous);
    scores[player] += score;
  }
}

Math.max(...scores);
