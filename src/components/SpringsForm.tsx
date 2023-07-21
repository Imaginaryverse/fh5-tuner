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

export const SpringsForm: FunctionComponent = () => {
  const [expandSprings, setExpandSprings] = useState<boolean>(true);

  const { springs, setSprings } = useBuild();

  return (
    <FormPaper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='h2' gutterBottom>
          Springs
        </Typography>

        <IconButton
          aria-label='expand springs'
          onClick={() => setExpandSprings(!expandSprings)}
        >
          {expandSprings ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={expandSprings}>
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
              id='springs-minimum-setting'
              label='Springs minimum setting'
              type='number'
              value={springs.min}
              onChange={e =>
                setSprings({ ...springs, min: Number(e.target.value) })
              }
              inputProps={{ min: 0.0 }}
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='springs-maximum-setting'
              label='Springs maximum setting'
              type='number'
              value={springs.max}
              onChange={e =>
                setSprings({ ...springs, max: Number(e.target.value) })
              }
              inputProps={{ max: 20.0 }}
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='springs-front'
              label='Front springs'
              type='number'
              value={springs.front.toFixed(1)}
              disabled
            />
          </FormControl>

          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <TextField
              id='springs-rear'
              label='Rear springs'
              type='number'
              value={springs.rear.toFixed(1)}
              disabled
            />
          </FormControl>
        </Box>
      </Collapse>
    </FormPaper>
  );
};
