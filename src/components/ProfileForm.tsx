import {
  Box,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { Drivetrain, Drivetrains, Manufacturer, Manufacturers } from '../types';
import { useBuild } from '../app/BuildContext';
import {
  calcCenterBalance,
  calcDiff,
  hpToKw,
  kgToLbs,
  kwToHp,
  lbsToKg,
} from '../utils';
import { FormPaper } from './FormPaper';

export const ProfileForm: FunctionComponent = () => {
  const {
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
    setDifferential,
    powerWeightRatio,
  } = useBuild();

  function handleDriveTrainChange(val: Drivetrain) {
    setDrivetrain(val);
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
  }

  return (
    <FormPaper gap={2}>
      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 1,
          }}
        >
          <Typography variant='h6' component='h2' gutterBottom>
            Build profile
          </Typography>

          <FormGroup>
            <Stack direction='row' spacing={0.25} alignItems='center'>
              <Typography>kg</Typography>
              <Switch
                checked={unitSystem === 'imperial'}
                onChange={event =>
                  setUnitSystem(event.target.checked ? 'imperial' : 'metric')
                }
              />
              <Typography>lbs</Typography>
            </Stack>
          </FormGroup>
        </Box>

        <TextField
          id='name'
          label='Name'
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
      </FormControl>

      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <InputLabel id='manufacturer-label'>Manufacturer</InputLabel>
        <Select
          labelId='manufacturer-label'
          id='manufacturer'
          value={manufacturer}
          label='Manufacturer'
          onChange={event =>
            setManufacturer(event.target.value as Manufacturer)
          }
          required
        >
          {Manufacturers.map(manufacturer => (
            <MenuItem key={manufacturer} value={manufacturer}>
              {manufacturer}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <InputLabel id='drivetrain-label'>Drivetrain</InputLabel>
        <Select
          labelId='drivetrain-label'
          id='drivetrain'
          value={drivetrain}
          label='Drivetrain'
          onChange={event =>
            handleDriveTrainChange(event.target.value as Drivetrain)
          }
          required
        >
          {Drivetrains.map(drivetrain => (
            <MenuItem key={drivetrain} value={drivetrain}>
              {drivetrain}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <TextField
          id='weight'
          label={`Weight (${unitSystem === 'imperial' ? 'lbs' : 'kg'})`}
          type='number'
          value={unitSystem === 'imperial' ? weight.lbs : weight.kg}
          onChange={event => {
            const val = Number(event.target.value);
            setWeight({
              kg: unitSystem === 'imperial' ? lbsToKg(val) : val,
              lbs: unitSystem === 'imperial' ? val : kgToLbs(val),
            });
          }}
          required
        />
      </FormControl>

      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <TextField
          id='power'
          label={`Power (${unitSystem === 'imperial' ? 'hp' : 'kw'})`}
          type='number'
          value={unitSystem === 'imperial' ? power.hp : power.kw}
          onChange={event => {
            const val = Number(event.target.value);
            setPower({
              hp: unitSystem === 'imperial' ? val : kwToHp(val),
              kw: unitSystem === 'imperial' ? hpToKw(val) : val,
            });
          }}
          required
        />
      </FormControl>

      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <TextField
          id='power-weight-ratio'
          label='Power/Weight Ratio'
          type='text'
          value={`${powerWeightRatio.toFixed(3)} ${
            unitSystem === 'imperial' ? 'hp/lbs' : 'kw/kg'
          }`}
          disabled
        />
      </FormControl>
    </FormPaper>
  );
};
