import { Container, Box, Typography } from '@mui/material';
import { ProfileForm } from './components/ProfileForm';
import { WeightDistributionForm } from './components/WeightDistributionForm';
import { DifferentialsForm } from './components/DifferentialsForm';
import { DampingForm } from './components/DampingForm';
import { SpringsForm } from './components/SpringsForm';
import { AntiRollBarsForm } from './components/AntiRollbarsForm';
import { BrakesForm } from './components/BrakesForm';

function App() {
  return (
    <Container>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h4' component='h1'>
          Forza Horizon 5 Tuner
        </Typography>

        <ProfileForm />

        <WeightDistributionForm />

        <DifferentialsForm />

        <BrakesForm />

        <DampingForm />

        <SpringsForm />

        <AntiRollBarsForm />
      </Box>
    </Container>
  );
}

export default App;
