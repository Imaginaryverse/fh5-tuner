export type Weight = {
  kg: number;
  lbs: number;
};

export type Power = {
  hp: number;
  kw: number;
};

export type WeightDistribution = {
  front: number;
  rear: number;
};

export type Differentials = {
  front: {
    acceleration: number;
    deceleration: number;
  };
  rear: {
    acceleration: number;
    deceleration: number;
  };
  center: {
    balance: number;
  };
};

export type Brakes = {
  brakingForce: {
    balance: number;
    pressure: number;
  };
};

export type Damping = {
  reboundStiffness: {
    front: number;
    rear: number;
  };
  bumpStiffness: {
    front: number;
    rear: number;
  };
};

export type Springs = {
  min: number;
  max: number;
  front: number;
  rear: number;
};

export type AntiRollbars = {
  front: number;
  rear: number;
};
