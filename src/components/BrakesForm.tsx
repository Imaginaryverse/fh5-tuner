import { FunctionComponent, useState } from 'react';
import { Paper, Box, Collapse, FormControl, TextField } from '@mui/material';
import { useBuild } from '../app/BuildContext';
import { FormHeader } from './FormHeader';

export const BrakesForm: FunctionComponent = () => {
  const [expandBrakes, setExpandBrakes] = useState<boolean>(true);

  const { brakes } = useBuild();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormHeader
        header='Brakes'
        isExpanded={expandBrakes}
        onExpandClick={() => setExpandBrakes(!expandBrakes)}
      />

      <Collapse in={expandBrakes}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 2,
          }}
        >
          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='brake-balance'
              label='Brake balance'
              type='number'
              value={brakes.brakingForce.balance}
              disabled
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='brake-pressure'
              label='Brake pressure'
              type='text'
              value={`+${Math.round(brakes.brakingForce.pressure * 100)}%`}
              disabled
            />
          </FormControl>
        </Box>
      </Collapse>
    </Paper>
  );
};
