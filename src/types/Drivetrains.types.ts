export const Drivetrains = ['AWD', 'FWD', 'RWD'] as const;

export type Drivetrain = (typeof Drivetrains)[number];
