function reducePolymer(polymer) {
  return [ ...polymer ].reduce((reduced, unit) => {
    const unitCode = unit.charCodeAt(0);
    const lastUnitCode = reduced.charCodeAt(reduced.length - 1);
    if (Math.abs(unitCode - lastUnitCode) === 32) {
      return reduced.slice(0, -1);
    }
    return reduced + unit;
  }, '');
}

const removedLengths = Array.from({ length: 26 }, (_, index) => {
  // code 65 === 'A', code 90 === 'Z'
  // Building a regex to remove all the occurrencies of a given letter,
  // regardless its case.
  const re = new RegExp(String.fromCharCode(65 + index), 'ig');
  const reduced = reducePolymer(input.replace(re, ''));
  return reduced.length;
});

Math.min(...removedLengths);
