const events = input.split('\n').sort().map(event => {
  return event.match(/^\[\d{4}-\d\d-\d\d \d\d:(\d\d)\] (Guard #(\d+)|falls|wakes)/).slice(1);
});

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
 * The solution is the same until this part.
 * Differently from part 1, we compute how many times each guard has been asleep
 * during each minute.
 */
const guardMinutes = Object.entries(sleepSchedule).reduce((map, [id, intervals]) => {
  const mins = new Uint8Array(60);
  for (const [start, end] of intervals) {
    for (let i = start; i < end; i++) mins[i]++;
  }
  map[id] = mins;
  return map;
}, {});

/**
 * The we get the maximum out of those figures.
 */
const guardMostAsleepMinuteCounts = Object.entries(guardMinutes).reduce((guardMap, [ id, minutes ]) => {
  guardMap[id] = Math.max(...minutes);
  return guardMap;
}, {});

/**
 * And then we get the maximum of the maximums (?)
 */
const [ guardId, mostAsleepMinuteCount ] = Object.entries(guardMostAsleepMinuteCounts)
  .reduce(([ maxId, maxMinuteCount ], [ id, minuteCount ]) => {
    return minuteCount > maxMinuteCount ? [ id, minuteCount ] : [ maxId, maxMinuteCount ];
  }, [ '', 0 ]);

guardId * guardMinutes[guardId].indexOf(mostAsleepMinuteCount);
