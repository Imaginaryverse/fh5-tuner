import { Collapse, FormControl, Slider, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useBuild } from '../app/BuildContext';
import { calcCenterBalance, calcDiff } from '../utils';
import { FormHeader } from './FormHeader';
import { FormPaper } from './FormPaper';

export const WeightDistributionForm: FunctionComponent = () => {
  const [expandWeightDist, setExpandWeightDist] = useState(true);

  const { weightDistribution, setWeightDistribution, setDifferential } =
    useBuild();

  function handleFrontWeightDistChange(val: number) {
    const frontVal = val;
    const rearVal = 100 - val;

    setWeightDistribution({ front: frontVal, rear: rearVal });

    setDifferential({
      front: {
        acceleration: calcDiff('front', 'acc', frontVal),
        deceleration: calcDiff('front', 'dec', frontVal),
      },
      rear: {
        acceleration: calcDiff('rear', 'acc', rearVal),
        deceleration: calcDiff('rear', 'dec', rearVal),
      },
      center: {
        balance: calcCenterBalance(rearVal),
      },
    });
  }

  return (
    <FormPaper>
      <FormHeader
        header='Weight Distribution'
        isExpanded={expandWeightDist}
        onExpandClick={() => setExpandWeightDist(!expandWeightDist)}
      />

      <Collapse in={expandWeightDist}>
        <FormControl variant='outlined' sx={{ width: '100%' }}>
          <Typography variant='body2' gutterBottom>
            Front: {weightDistribution.front}%
          </Typography>
          <Slider
            aria-label='front weight distribution'
            value={weightDistribution.front}
            onChange={(_, val) => handleFrontWeightDistChange(val as number)}
            valueLabelDisplay='auto'
            step={1}
            marks
            min={0}
            max={100}
          />
        </FormControl>

        <FormControl variant='outlined' sx={{ width: '100%' }}>
          <Typography variant='body2' gutterBottom>
            Rear: {weightDistribution.rear}%
          </Typography>
          <Slider
            aria-label='rear weight distribution'
            value={weightDistribution.rear}
            valueLabelDisplay='auto'
            step={1}
            marks
            min={0}
            max={100}
            disabled
          />
        </FormControl>
      </Collapse>
    </FormPaper>
  );
};
