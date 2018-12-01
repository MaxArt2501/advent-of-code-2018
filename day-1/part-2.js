const changes = input.split("\n").map(Number);

function *getChanges() {
  for (let index= 0;; index++) {
    yield changes[index % changes.length];
  }
}

let current = 0;
const frequencies = new Set([ current ]);
for (const change of getChanges()) {
  current += change;
  if (frequencies.has(current)) break;
  frequencies.add(current);
}
current;
