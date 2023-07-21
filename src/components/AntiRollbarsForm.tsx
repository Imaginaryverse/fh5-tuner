import { FunctionComponent, useState } from 'react';
import { useBuild } from '../app/BuildContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  FormControl,
  TextField,
} from '@mui/material';
import { FormPaper } from './FormPaper';

export const AntiRollBarsForm: FunctionComponent = () => {
  const [expandAntiRollbars, setExpandAntiRollbars] = useState<boolean>(true);

  const { antiRollbars } = useBuild();

  return (
    <FormPaper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='h2' gutterBottom>
          Anti-roll bars
        </Typography>

        <IconButton
          aria-label='expand anti-roll bars'
          onClick={() => setExpandAntiRollbars(!expandAntiRollbars)}
        >
          {expandAntiRollbars ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={expandAntiRollbars}>
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
              id='anti-roll-bars-front'
              label='Front anti-roll bars'
              type='number'
              value={antiRollbars.front.toFixed(1)}
              disabled
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='anti-roll-bars-rear'
              label='Rear anti-roll bars'
              type='number'
              value={antiRollbars.rear.toFixed(1)}
              disabled
            />
          </FormControl>
        </Box>
      </Collapse>
    </FormPaper>
  );
};
