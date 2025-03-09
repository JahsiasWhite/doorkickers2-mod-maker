/**
 * NOTE: minAimTime2/maxAimTime2 are unique to Scopes.
 * Instead of adding to the attacktype aimTime, we defined a new range of aimtime (for the range defined in the scope),
 * which will be added on top of the aimTime from the attacktype
 */

const AttackTypeModifier = [
  { label: 'minAimTime2', value: 0 },
  { label: 'maxAimTime2', value: 0 },
  { label: 'resetTime', value: 0 },
  { label: 'accuracyAdd', value: 0 },
  { label: 'critChanceAdd', value: 0 },
];

export default AttackTypeModifier;
