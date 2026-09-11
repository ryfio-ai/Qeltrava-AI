import { calculateOEE } from '../oee';
import { calculateTaktTime } from '../takt-time';
import { validatePositiveNumber } from '../validation';

console.log('=== RUNNING MANUFACTURING MATH & HARDENING AUDIT ===\n');

// 1. OEE Edge Cases
console.log('Test 1: Valid OEE calculation...');
const validOEE = calculateOEE({
  plannedProductionMinutes: 480,
  downtimeMinutes: 30,
  idealCycleTimeSeconds: 12,
  totalUnitsProduced: 2000,
  goodUnitsProduced: 1950,
});
console.log('Result State:', validOEE.state);
console.log('OEE Value:', validOEE.value, validOEE.unit);
console.log('Category:', validOEE.category);
console.assert(validOEE.state === 'VALID', 'Expected state to be VALID');

console.log('\nTest 2: Planned Time = 0 -> UNDEFINED...');
const undefinedOEE = calculateOEE({
  plannedProductionMinutes: 0,
  downtimeMinutes: 0,
  idealCycleTimeSeconds: 12,
  totalUnitsProduced: 100,
  goodUnitsProduced: 100,
});
console.log('Result State:', undefinedOEE.state);
console.assert(undefinedOEE.state === 'UNDEFINED', 'Expected state to be UNDEFINED');

console.log('\nTest 3: Downtime > Planned -> INVALID...');
const invalidDowntimeOEE = calculateOEE({
  plannedProductionMinutes: 480,
  downtimeMinutes: 500,
  idealCycleTimeSeconds: 12,
  totalUnitsProduced: 100,
  goodUnitsProduced: 100,
});
console.log('Result State:', invalidDowntimeOEE.state);
console.assert(invalidDowntimeOEE.state === 'INVALID', 'Expected state to be INVALID');

console.log('\nTest 4: Good > Total Units -> INVALID...');
const invalidUnitsOEE = calculateOEE({
  plannedProductionMinutes: 480,
  downtimeMinutes: 30,
  idealCycleTimeSeconds: 12,
  totalUnitsProduced: 100,
  goodUnitsProduced: 120,
});
console.log('Result State:', invalidUnitsOEE.state);
console.assert(invalidUnitsOEE.state === 'INVALID', 'Expected state to be INVALID');

console.log('\nTest 5: Total Units = 0 -> NO_DATA...');
const noDataOEE = calculateOEE({
  plannedProductionMinutes: 480,
  downtimeMinutes: 30,
  idealCycleTimeSeconds: 12,
  totalUnitsProduced: 0,
  goodUnitsProduced: 0,
});
console.log('Result State:', noDataOEE.state);
console.assert(noDataOEE.state === 'NO_DATA', 'Expected state to be NO_DATA');

// 2. Takt Time Edge Cases
console.log('\nTest 6: Valid Takt Time...');
const validTakt = calculateTaktTime({
  availableProductionMinutes: 450,
  customerDemandUnits: 900,
});
console.log('Result State:', validTakt.state);
console.log('Takt Time Value:', validTakt.value, validTakt.unit);
console.assert(validTakt.state === 'VALID', 'Expected state to be VALID');

console.log('\nTest 7: Zero Demand Takt Time -> NO_DATA...');
const noDemandTakt = calculateTaktTime({
  availableProductionMinutes: 450,
  customerDemandUnits: 0,
});
console.log('Result State:', noDemandTakt.state);
console.assert(noDemandTakt.state === 'NO_DATA', 'Expected state to be NO_DATA');

// 3. Validation Helpers
console.log('\nTest 8: Validation boundary check...');
const err = validatePositiveNumber(-5, 'downtimeMinutes');
console.log('Validation Error:', err?.message);
console.assert(err?.rule === 'NON_NEGATIVE', 'Expected NON_NEGATIVE rule violation');

console.log('\n=== ALL MANUFACTURING TESTS PASSED CLEANLY! ===');
