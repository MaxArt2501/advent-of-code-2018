const [ players, marbles ] = input.split(/\D+/).map(Number);
/**
 * Yes, we could use arrays too.
 * But when I saw the second part, I though it could be done by speeding up the
 * first with typed arrays and call it a day.
 * Turned out it couldn't, but I'm keeping the typed array version, so there.
 * Keep in mind that instead of .copyWithin, I used .splice with the arrays.
 * And yes, it was fast enough.
 */
const scores = new Uint32Array(players);
const circle = new Uint32Array(marbles);

let circleLength = 1;
let current = 0;
for (let value = 1; value <= marbles; value++) {
  if (value % 23) {
    current = ((current + 1) % circleLength) + 1;
    circle.copyWithin(current + 1, current, circleLength);
    circle[current] = value;
    circleLength++;
  } else {
    const player = value % players;
    let score = value;
    current = current > 6 ? current - 7 : current + circleLength - 7;
    score += circle[current];
    circle.copyWithin(current, current + 1, circleLength);
    scores[player] += score;
    circleLength--;
  }
}

Math.max(...scores);
