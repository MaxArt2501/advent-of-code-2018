const jobs = new Array(5).fill(null);

function getRequirements(step) {
  return requirements.filter(([ , s ]) => s === step).map(([ s ]) => s);
}

function canBeTaken(step, takenSteps) {
  const reqs = getRequirements(step);
  return reqs.every(l => takenSteps.includes(l));
}

const steps = [ ...new Set(requirements.flat()) ].sort();
let frontier = steps.filter(step => getRequirements(step).length === 0);

let time = 0;
let takenSteps = '';

while (takenSteps.length < steps.length) {
  // First, we take note of the jobs that have been finished at this time
  // It should be at least one
  const finished = new Set();
  jobs = jobs.map(job => {
    if (job && job.end === time) {
      finished.add(job.step);
      return null;
    }
    return job;
  });
  takenSteps += [ ...finished ].join('');

  // The we expand the frontier of the steps that are available to be taken
  const fset = new Set(frontier);
  finished.forEach(step => {
    const next = reqs.filter(([l, e]) => l === step && canBeTaken(e, takenSteps + step)).map(s => s[1]);
    next.forEach(step => fset.add(step));
  });
  frontier = [ ...fset ].sort();

  // Now we take new jobs based on the frontier
  jobs = jobs.map(job => {
    if (!job) {
      const step = frontier.shift();
      return step ? {
        step,
        end: time + step.charCodeAt(0) - 4
      } : null;
    }
    return job;
  });

  // Advancing time to the end of the next job
  const newTime = jobs.reduce((min, job) => job ? Math.min(min, job.end) : min, Infinity);
  if (newTime < Infinity) {
    time = newTime;
  }
}

time;
