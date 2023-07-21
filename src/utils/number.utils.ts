import { Power, UnitSystem, Weight } from '../types';

export function kgToLbs(kg: number): number {
  if (Number.isNaN(kg)) {
    return 0;
  }

  return kg * 2.20462;
}

export function lbsToKg(lbs: number): number {
  if (Number.isNaN(lbs)) {
    return 0;
  }

  return lbs / 2.20462;
}

export function hpToKw(hp: number): number {
  if (Number.isNaN(hp)) {
    return 0;
  }

  return hp * 0.7457;
}

export function kwToHp(kw: number): number {
  if (Number.isNaN(kw)) {
    return 0;
  }

  return kw / 0.7457;
}

export function calcPowerWeightRatio(
  power: Power,
  weight: Weight,
  unitSystem: UnitSystem
): number {
  if (!power.hp || !power.kw || !weight.kg || !weight.lbs) {
    return 0;
  } else if (Number.isNaN(power) || Number.isNaN(weight)) {
    return 0;
  }

  return unitSystem === 'metric' ? power.kw / weight.kg : power.hp / weight.lbs;
}
