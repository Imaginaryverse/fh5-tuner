export function calcDiff(
  side: 'front' | 'rear',
  type: 'acc' | 'dec',
  weightDist: number
): number {
  const FRONT_ACC_BASE = 15;
  const FRONT_DEC_BASE = 10;
  const REAR_ACC_BASE = 25;
  const REAR_DEC_BASE = 30;

  let max = 0;
  let base = 0;

  switch (side) {
    case 'front':
      max = type === 'acc' ? 25 : 20;
      base = type === 'acc' ? FRONT_ACC_BASE : FRONT_DEC_BASE;
      break;
    case 'rear':
      max = 45;
      base = type === 'acc' ? REAR_ACC_BASE : REAR_DEC_BASE;
      break;
    default:
      break;
  }

  const mid = 50;
  const diff = mid - weightDist;
  const res = Math.abs(base + diff);

  if (res < base) {
    return base;
  } else if (res > max) {
    return max;
  }

  return res;
}

export function calcCenterBalance(rearDist: number): number {
  const MIN = 50;
  const MAX = 70;
  const MID = 50;
  const BASE = 60;

  const diff = MID - rearDist;
  const res = BASE + diff;

  if (res < MIN) {
    return MIN;
  } else if (res > MAX) {
    return MAX;
  }

  return res;
}

export function calcSprings(
  min: number,
  max: number,
  weightDist: number
): number {
  const maxMinDiff = max - min;
  const dist = weightDist / 100;

  const value = maxMinDiff * dist + min;

  return value;
}

export function calcAntirollBar(weightDist: number): number {
  const value = 64 * (weightDist / 100) + 1;

  return value;
}

export function calcReboundStiffness(weightDist: number): number {
  const MIN = 1;
  const MAX = 20;
  const DIFF = MAX - MIN;

  const distOffset = weightDist / 100;
  const RBS = DIFF * distOffset;

  const value = RBS + MIN;

  return value;
}

export function calcBumpStiffness(rbs: number): number {
  const value = rbs * 0.55;

  return value;
}

export function calcSpringRate(
  min: number,
  max: number,
  weightDist: number
): number {
  if (Number.isNaN(min) || Number.isNaN(max) || Number.isNaN(weightDist)) {
    return 0;
  }

  const distMultiplier = weightDist / 100;
  const diff = max - min;
  const offset = diff * distMultiplier;
  const value = min + offset;

  return value;
}

export function calcBrakePressure(rearWeightDist: number): number {
  const value = (100 - rearWeightDist) / 1000;

  return value;
}
