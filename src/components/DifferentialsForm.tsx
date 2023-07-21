import { FunctionComponent, useMemo, useState } from 'react';
import { Box, Collapse, FormControl, TextField } from '@mui/material';
import { useBuild } from '../app/BuildContext';
import { FormHeader } from './FormHeader';
import { FormPaper } from './FormPaper';

export const DifferentialsForm: FunctionComponent = () => {
  const [expandDifferentials, setExpandDifferentials] = useState<boolean>(true);

  const { drivetrain, differential } = useBuild();

  const showFrontDifferential = useMemo(
    () => ['FWD', 'AWD'].includes(drivetrain),
    [drivetrain]
  );
  const showRearDifferential = useMemo(
    () => ['RWD', 'AWD'].includes(drivetrain),
    [drivetrain]
  );

  return (
    <FormPaper>
      <FormHeader
        header='Differentials'
        isExpanded={expandDifferentials}
        onExpandClick={() => setExpandDifferentials(!expandDifferentials)}
      />

      <Collapse in={expandDifferentials}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 2,
          }}
        >
          {showFrontDifferential && (
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <TextField
                id='front-diff-acc'
                label='Front differential acceleration'
                type='number'
                value={differential.front.acceleration}
                disabled
              />
            </FormControl>
          )}

          {showFrontDifferential && (
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <TextField
                id='front-diff-dec'
                label='Front differential deceleration'
                type='number'
                value={differential.front.deceleration}
                disabled
              />
            </FormControl>
          )}

          {showRearDifferential && (
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <TextField
                id='rear-diff-acc'
                label='Rear differential acceleration'
                type='number'
                value={differential.rear.acceleration}
                disabled
              />
            </FormControl>
          )}

          {showRearDifferential && (
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <TextField
                id='rear-diff-dec'
                label='Rear differential deceleration'
                type='number'
                value={differential.rear.deceleration}
                disabled
              />
            </FormControl>
          )}

          {drivetrain === 'AWD' && (
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <TextField
                id='center-diff-balance'
                label='Center differential balance'
                type='number'
                value={differential.center.balance}
                disabled
              />
            </FormControl>
          )}
        </Box>
      </Collapse>
    </FormPaper>
  );
};
