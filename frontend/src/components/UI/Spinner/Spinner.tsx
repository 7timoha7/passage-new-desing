import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress color="warning" thickness={6} />
    </Box>
  );
};

export default Spinner;
