const requirements = input.split('\n').map(line => ([ line[5], line[36] ]));

function getRequirements(step) {
  return requirements.filter(([ , s ]) => s === step).map(([ s ]) => s);
}

function canBeTaken(step, takenSteps) {
  const reqs = getRequirements(step);
  return reqs.every(l => takenSteps.includes(l));
}

const steps = [ ...new Set(requirements.flat()) ].sort();

/**
 * We call "frontier" the steps that can be taken at a given point.
 * As steps are taken, new ones can be added to the frontier.
 */
let frontier = steps.filter(step => getRequirements(step).length === 0);

let takenSteps = '';
while (frontier.length > 0) {
  const step = frontier[0];
  const next = reqs.filter(([ l, e ]) => l === step && canBeTaken(e, takenSteps + step)).map(s => s[1]);
  const fset = new Set(frontier);
  fset.delete(step);
  next.forEach(s => fset.add(s));
  frontier = [ ...fset ].sort();
  takenSteps += step;
}

takenSteps;
