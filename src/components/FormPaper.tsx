import { Paper } from '@mui/material';
import { FunctionComponent } from 'react';

type Props = {
  children: React.ReactNode;
  gap?: number;
};

export const FormPaper: FunctionComponent<Props> = ({ children, gap }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap,
      }}
    >
      {children}
    </Paper>
  );
};
