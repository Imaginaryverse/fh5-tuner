import { FunctionComponent, useState } from 'react';
import { useBuild } from '../app/BuildContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  FormControl,
  TextField,
} from '@mui/material';
import { FormPaper } from './FormPaper';

export const DampingForm: FunctionComponent = () => {
  const [expandDamping, setExpandDamping] = useState<boolean>(true);

  const { damping } = useBuild();

  return (
    <FormPaper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='h2' gutterBottom>
          Damping
        </Typography>

        <IconButton
          aria-label='expand damping'
          onClick={() => setExpandDamping(!expandDamping)}
        >
          {expandDamping ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={expandDamping}>
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
              id='front-rebound-stiffness'
              label='Front rebound stiffness'
              type='number'
              value={damping.reboundStiffness.front.toFixed(1)}
              disabled
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='rear-rebound-stiffness'
              label='Rear rebound stiffness'
              type='number'
              value={damping.reboundStiffness.rear.toFixed(1)}
              disabled
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='front-bump-stiffness'
              label='Front bump stiffness'
              type='number'
              value={damping.bumpStiffness.front.toFixed(1)}
              disabled
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='rear-bump-stiffness'
              label='Rear bump stiffness'
              type='number'
              value={damping.bumpStiffness.rear.toFixed(1)}
              disabled
            />
          </FormControl>
        </Box>
      </Collapse>
    </FormPaper>
  );
};
