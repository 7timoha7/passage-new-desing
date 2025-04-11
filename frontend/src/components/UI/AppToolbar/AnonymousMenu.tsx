import { Button, Grid, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { AccountCircle, LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(29,53,4,0.9)',
    },
    secondary: {
      main: 'rgb(0,0,0)',
    },
  },
});

interface Props {
  close?: () => void;
}

const AnonymousMenu: React.FC<Props> = ({ close }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container alignItems={'center'}>
          <Grid
            item
            mr={1}
            sx={{
              '@media (max-width: 1200px)': {
                mb: 1,
                ml: 2,
              },
            }}
            alignItems="center"
          >
            <Button
              size={'small'}
              component={NavLink}
              to="/register"
              variant="outlined"
              startIcon={<AccountCircle />}
              color="secondary"
              sx={{ ':hover': { color: '#ddbe86' } }}
              onClick={close}
            >
              <Typography fontSize={'12px'}>Регистрация</Typography>
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              '@media (max-width: 1200px)': {
                mb: 1,
              },
            }}
          >
            <Button
              size={'small'}
              sx={{ ':hover': { color: '#ddbe86' } }}
              component={NavLink}
              to="/login"
              variant="outlined"
              startIcon={<LockOutlined />}
              color="secondary"
              onClick={close}
            >
              <Typography fontSize={'12px'}>Вход</Typography>
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default AnonymousMenu;
