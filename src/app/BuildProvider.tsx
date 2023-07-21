/* eslint-disable @typescript-eslint/no-empty-function */
import { FunctionComponent, createContext, useEffect, useState } from 'react';
import {
  AntiRollbars,
  Brakes,
  Damping,
  Differentials,
  Drivetrain,
  Manufacturer,
  Power,
  Springs,
  UnitSystem,
  Weight,
  WeightDistribution,
} from '../types';
import {
  calcAntirollBar,
  calcBrakePressure,
  calcBumpStiffness,
  calcCenterBalance,
  calcDiff,
  calcPowerWeightRatio,
  calcReboundStiffness,
  calcSpringRate,
  hpToKw,
  lbsToKg,
} from '../utils';

type BuildContextType = {
  unitSystem: UnitSystem; // unit system
  setUnitSystem: (unitSystem: UnitSystem) => void;
  name: string; // name of the build
  setName: (name: string) => void;
  manufacturer: Manufacturer; // manufacturer of the build
  setManufacturer: (manufacturer: Manufacturer) => void;
  drivetrain: Drivetrain; // drivetrain of the build
  setDrivetrain: (drivetrain: Drivetrain) => void;
  weight: Weight; // weight of the build
  setWeight: (weight: Weight) => void;
  power: Power; // horsepower of the build
  setPower: (power: Power) => void;
  weightDistribution: WeightDistribution; // weight distribution of the build
  setWeightDistribution: (weightDistribution: WeightDistribution) => void;
  differential: Differentials; // differentials of the build
  setDifferential: (differential: Differentials) => void;
  brakes: Brakes; // brakes of the build
  setBrakes: (brakes: Brakes) => void;
  damping: Damping; // damping of the build
  setDamping: (damping: Damping) => void;
  springs: Springs; // springs of the build
  setSprings: (springs: Springs) => void;
  antiRollbars: AntiRollbars; // anti-rollbars of the build
  setAntiRollbars: (antiRollbars: AntiRollbars) => void;
  powerWeightRatio: number; // power-to-weight ratio of the build
  setPowerWeightRatio: (powerWeightRatio: number) => void;
};

export const BuildContext = createContext<BuildContextType>({
  unitSystem: 'imperial',
  setUnitSystem: () => {},
  name: '',
  setName: () => {},
  manufacturer: 'AMC',
  setManufacturer: () => {},
  drivetrain: 'AWD',
  setDrivetrain: () => {},
  weight: { kg: 0, lbs: 0 },
  setWeight: () => {},
  power: { hp: 0, kw: 0 },
  setPower: () => {},
  weightDistribution: {
    front: 50,
    rear: 50,
  },
  setWeightDistribution: () => {},
  differential: {
    front: {
      acceleration: 0,
      deceleration: 0,
    },
    rear: {
      acceleration: 0,
      deceleration: 0,
    },
    center: {
      balance: 0,
    },
  },
  setDifferential: () => {},
  brakes: {
    brakingForce: {
      balance: 0,
      pressure: 0,
    },
  },
  setBrakes: () => {},
  damping: {
    reboundStiffness: {
      front: 0,
      rear: 0,
    },
    bumpStiffness: {
      front: 0,
      rear: 0,
    },
  },
  setDamping: () => {},
  springs: {
    min: 0,
    max: 0,
    front: 0,
    rear: 0,
  },
  setSprings: () => {},
  antiRollbars: {
    front: 0,
    rear: 0,
  },
  setAntiRollbars: () => {},
  powerWeightRatio: 0,
  setPowerWeightRatio: () => {},
});

type BuildProviderProps = {
  children: React.ReactNode;
};

export const BuildProvider: FunctionComponent<BuildProviderProps> = ({
  children,
}) => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(
    (localStorage.getItem('unitSystem') as UnitSystem) || 'imperial'
  );
  const [name, setName] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<Manufacturer>('AMC');
  const [drivetrain, setDrivetrain] = useState<Drivetrain>('RWD');
  const [weight, setWeight] = useState<Weight>({ kg: 0, lbs: 0 });
  const [power, setPower] = useState<Power>({ hp: 0, kw: 0 });
  const [weightDistribution, setWeightDistribution] =
    useState<WeightDistribution>({
      front: 50,
      rear: 50,
    });
  const [differential, setDifferential] = useState<Differentials>({
    front: {
      acceleration: 0,
      deceleration: 0,
    },
    rear: {
      acceleration: 0,
      deceleration: 0,
    },
    center: {
      balance: 0,
    },
  });
  const [brakes, setBrakes] = useState<Brakes>({
    brakingForce: {
      balance: 0,
      pressure: 0,
    },
  });
  const [damping, setDamping] = useState<Damping>({
    reboundStiffness: {
      front: 0,
      rear: 0,
    },
    bumpStiffness: {
      front: 0,
      rear: 0,
    },
  });
  const [springs, setSprings] = useState<Springs>({
    min: 0,
    max: 0,
    front: 0,
    rear: 0,
  });
  const [antiRollbars, setAntiRollbars] = useState<AntiRollbars>({
    front: 0,
    rear: 0,
  });
  const [powerWeightRatio, setPowerWeightRatio] = useState<number>(0);

  useEffect(() => {
    setDifferential({
      front: {
        acceleration: calcDiff('front', 'acc', weightDistribution.front),
        deceleration: calcDiff('front', 'dec', weightDistribution.front),
      },
      rear: {
        acceleration: calcDiff('rear', 'acc', weightDistribution.rear),
        deceleration: calcDiff('rear', 'dec', weightDistribution.rear),
      },
      center: {
        balance: calcCenterBalance(weightDistribution.rear),
      },
    });
  }, [drivetrain, weightDistribution]);

  useEffect(() => {
    setBrakes({
      brakingForce: {
        balance: 100 - weightDistribution.front,
        pressure: calcBrakePressure(weightDistribution.rear),
      },
    });

    const frontReboundStiffness = calcReboundStiffness(
      weightDistribution.front
    );
    const rearReboundStiffness = calcReboundStiffness(weightDistribution.rear);

    setDamping({
      reboundStiffness: {
        front: frontReboundStiffness,
        rear: rearReboundStiffness,
      },
      bumpStiffness: {
        front: calcBumpStiffness(frontReboundStiffness),
        rear: calcBumpStiffness(rearReboundStiffness),
      },
    });

    setAntiRollbars({
      front: calcAntirollBar(weightDistribution.front),
      rear: calcAntirollBar(weightDistribution.rear),
    });
  }, [weightDistribution]);

  useEffect(() => {
    setSprings({
      ...springs,
      front: calcSpringRate(springs.min, springs.max, weightDistribution.front),
      rear: calcSpringRate(springs.min, springs.max, weightDistribution.rear),
    });
  }, [springs, weightDistribution]);

  useEffect(() => {
    setPowerWeightRatio(calcPowerWeightRatio(power, weight, unitSystem));
  }, [unitSystem, power, weight]);

  useEffect(() => {
    // save unit system to local storage
    localStorage.setItem('unitSystem', unitSystem);
  }, [unitSystem]);

  return (
    <BuildContext.Provider
      value={{
        unitSystem,
        setUnitSystem,
        name,
        setName,
        manufacturer,
        setManufacturer,
        drivetrain,
        setDrivetrain,
        weight,
        setWeight,
        power,
        setPower,
        weightDistribution,
        setWeightDistribution,
        differential,
        setDifferential,
        brakes,
        setBrakes,
        damping,
        setDamping,
        springs,
        setSprings,
        antiRollbars,
        setAntiRollbars,
        powerWeightRatio,
        setPowerWeightRatio,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};
