import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../menuCategoriesSlice';
import { fetchCategories } from '../menuCategoriesThunks';
import { Typography } from '@mui/material';
import Categories from './Categories';
import img1 from '../../../assets/images/newFon/17.jpeg';
import { toolbarTobAndBottomColor } from '../../../styles';
import { Link } from 'react-router-dom';
import LinkTel from '../../../components/UI/AppToolbar/NavigateTop/Components/LinkTel';

const drawerWidth = 280;

const MenuCategories = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const drawer = <Categories categories={categories} close={closeMenu} />;

  return (
    <Box
      sx={{
        display: 'flex',
        '@media (min-width: 1200px)': {
          mr: 2,
        },
        background: 'transparent',
      }}
    >
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { sm: 0 },
          borderRadius: '20px',
          display: { lg: 'none' },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundImage: `url(${img1})`,
              backgroundSize: 'repeat',
            },
            '& .MuiDrawer-paperAnchorLeft': {
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{ m: 0, pt: 1.2, pb: 1.2 }} textAlign={'center'}>
            <Link to="/" style={{ margin: 'auto' }} onClick={closeMenu}>
              <img style={{ maxWidth: '200px' }} src="/logo_brown_mobile.png" alt="passage" />
            </Link>
          </Box>

          <Box>
            <Typography
              sx={{ m: 0, pt: 1.2, pb: 1.2 }}
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'bold'}
              color={toolbarTobAndBottomColor}
            >
              ПРОДУКЦИЯ
            </Typography>
          </Box>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: toolbarTobAndBottomColor,
          display: { lg: 'none' },
          borderTop: '1.5px solid black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '20px',
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 0,
                color: 'white',
                '&:hover': {
                  color: '#e8b86d',
                },
              }}
            >
              <MenuIcon fontSize={'large'} />
              <Typography
                variant={'h6'}
                textAlign={'center'}
                sx={{
                  ml: 1,
                }}
              >
                МЕНЮ
              </Typography>
            </IconButton>
          </Box>

          <Box
            sx={{
              '@media (max-width: 318px)': {
                mb: '7px',
              },
            }}
          >
            <LinkTel />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuCategories;
