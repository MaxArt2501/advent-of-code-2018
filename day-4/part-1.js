/**
 * Parsing the input lines, sorted.
 */
const events = input.split('\n').sort().map(event => {
  return event.match(/^\[\d{4}-\d\d-\d\d \d\d:(\d\d)\] (Guard #(\d+)|falls|wakes)/).slice(1);
});

/**
 * We create a list of sleep intervals for each guard. We use .reduce, so we can
 * keep track of the current guard and the start of their nap.
 */
const { sleepSchedule } = events.reduce((state, [ minute, action, id ]) => {
  if (action.slice(0, 5) === 'Guard') {
    state.currentGuard = id;
  } else if (action === 'falls') {
    state.sleepStart = minute;
  } else {
    if (!(state.currentGuard in state.sleepSchedule)) {
      state.sleepSchedule[state.currentGuard] = [];
    }
    state.sleepSchedule[state.currentGuard].push([ +state.sleepStart, +minute ]);
  }
  return state;
}, { sleepSchedule: {} });

/**
 * Then, we get the id of the guard that napped the most.
 */
const [ mostAsleepId ] = Object.entries(sleepSchedule).reduce(([ maxId, max ], [ id, naps ]) => {
  const totalSleep = naps.reduce((total, [ start, end ]) => total + end - start, 0);
  return totalSleep > max ? [ id, totalSleep ] : [ maxId, max ];
}, [ '', 0 ]);

/**
 * After that, we mark how many times each minute the guard has been asleep...
 */
const minutes = new Uint8Array(60);
for (const [ start, end ] of sleepSchedule[mostAsleepId]) {
  for (let i = start; i < end; i++) {
    minutes[i]++;
  }
}

/**
 * ... and we get the maximum of those figures.
 */
const mostAsleepMinute = Math.max(...minutes);

/**
 * Finally, we get the associated minute and multiply if by the id.
 */
mostAsleepId * minutes.indexOf(mostAsleepMinute);
