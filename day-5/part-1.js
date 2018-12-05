const reduced = [ ...input ].reduce((reduced, unit) => {
  const unitCode = unit.charCodeAt(0);
  const lastUnitCode = reduced.charCodeAt(reduced.length - 1);
  // Two letters are the same with different capitalization if their code differ
  // by 32. In that case, we have two reacting units.
  if (Math.abs(unitCode - lastUnitCode) === 32) {
    return reduced.slice(0, -1);
  }
  return reduced + unit;
}, '');

reduced.length;
