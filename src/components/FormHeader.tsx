import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

type Props = {
  header: string;
  isExpanded: boolean;
  onExpandClick: () => void;
};

export const FormHeader: FunctionComponent<Props> = ({
  header,
  isExpanded,
  onExpandClick,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant='h6' component='h2' gutterBottom>
        {header}
      </Typography>

      <IconButton
        aria-label='expand weight distribution'
        onClick={onExpandClick}
      >
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </Box>
  );
};
