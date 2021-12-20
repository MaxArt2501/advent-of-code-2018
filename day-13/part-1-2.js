const rawTracks = input.split('\n').slice(0, -1);

const carts = rawTracks.flatMap(
  (line, row) => [...line.matchAll(/[\^>v<]/g)].map(m => ({
    direction: m[0],
    coords: [m.index, row],
    turning: 0
  }))
);

const tracks = rawTracks.map(line => line.replace(/[<>]/g, '-').replace(/[\^v]/g, '|'));

const INTERSECTION_MAP = {
  '^': '<^>',
  '>': '^>v',
  'v': '>v<',
  '<': 'v<^'
};
const CORNER_MAP = {
  '/': {
    '^': '>',
    '>': '^',
    'v': '<',
    '<': 'v'
  },
  '\\': {
    '^': '<',
    '>': 'v',
    'v': '>',
    '<': '^'
  }
};
const SHIFT_MAP = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0]
};

let lastCollision;

function moveCarts() {
  for (let index = 0; index < carts.length; index++) {
    const cart = carts[index];
    const [dc, dr] = SHIFT_MAP[cart.direction];
    cart.coords = [cart.coords[0] + dc, cart.coords[1] + dr];
    const endCell = tracks[cart.coords[1]][cart.coords[0]];
    if (endCell === '+') {
      cart.direction = INTERSECTION_MAP[cart.direction][cart.turning];
      cart.turning = (cart.turning + 1) % 3;
    } else if (endCell === '/' || endCell === '\\') {
      cart.direction = CORNER_MAP[endCell][cart.direction];
    }
    const collidingCart = carts.find(({ coords }, idx) => idx !== index && cart.coords[0] === coords[0] && cart.coords[1] === coords[1]);
    if (collidingCart) {
      lastCollision = cart.coords;
      // Removing the carts. Yes, we're mutating the array. Sue me.
      const collidingIndex = carts.indexOf(collidingCart);
      carts.splice(Math.max(index, collidingIndex), 1);
      carts.splice(Math.min(index, collidingIndex), 1);
      // Taking into account a previous index for the colliding cart
      index -= collidingIndex < index ? 2 : 1;
    }
  }
  // Re-ordering the list of carts
  carts.sort((cart1, cart2) => cart1.coords[1] - cart2.coords[1] || cart1.coords[0] - cart2.coords[0]);
}

while (!lastCollision) moveCarts();
console.log(lastCollision.join());

while (carts.length > 1) moveCarts();
console.log(carts[0].coords.join());
