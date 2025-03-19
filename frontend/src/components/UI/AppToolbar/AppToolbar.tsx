import { Box, styled, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import NavigateTop from './NavigateTop/NavigateTop';
import React from 'react';

const AppToolbar = () => {
  const isMobile = useMediaQuery('(max-width:1200px)');
  const isMobileLogo = useMediaQuery('(max-width:800px)');

  const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });
  return (
    <Box>
      {!isMobile && <NavigateTop />}

      {/*<AppBar position="sticky" sx={!isMobile ? ToolBarStyles : ToolBarMobileStyles}>*/}
      {/*  <Toolbar>*/}
      {/*    <Container maxWidth="xl">*/}
      {/*      <Grid*/}
      {/*        container*/}
      {/*        justifyContent="space-between"*/}
      {/*        alignItems="center"*/}
      {/*        spacing={2}*/}
      {/*        sx={{ '@media (max-width: 550px)': { justifyContent: 'center' } }}*/}
      {/*      >*/}
      {/*        {!isMobileLogo ? (*/}
      {/*          <Grid item>*/}
      {/*            <Link to="/" style={{ margin: 'auto' }}>*/}
      {/*              <img style={{ maxWidth: '300px' }} src="/logo_brown.png" alt="passage" />*/}
      {/*            </Link>*/}
      {/*          </Grid>*/}
      {/*        ) : (*/}
      {/*          <Grid item>*/}
      {/*            <Link to="/" style={{ margin: 'auto' }}>*/}
      {/*              <img style={{ maxWidth: '280px' }} src="/logo_brown_main_mobile.png" alt="passage" />*/}
      {/*            </Link>*/}
      {/*          </Grid>*/}
      {/*        )}*/}

      {/*        <Grid item sx={{ flexGrow: 2, minWidth: 0, ml: 2, mr: 2 }}>*/}
      {/*          <Search />*/}
      {/*        </Grid>*/}

      {/*        <Grid item>*/}
      {/*          <Basket />*/}
      {/*        </Grid>*/}
      {/*      </Grid>*/}
      {/*    </Container>*/}
      {/*  </Toolbar>*/}
      {/*</AppBar>*/}
    </Box>
  );
};

export default AppToolbar;
