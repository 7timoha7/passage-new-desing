import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MenuCategoriesTop from '../../../../features/MenuCategories/components/MenuCategoriesTop';
import { Button, Container, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import UserMenu from '../UserMenu';
import AnonymousMenu from '../AnonymousMenu';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../features/users/usersSlice';
import { toolbarTobAndBottomColor, ToolBarTopText, ToolBarTopTextSearchBasket } from '../../../../styles';
import ForUsers from './Components/ForClients/ForUsers/ForUsers';
import SearchIcon from '@mui/icons-material/Search';
import Basket from '../../../../features/Basket/Basket';
import LinkTel from './Components/LinkTel';

interface Props {
  close?: () => void;
}

// Обертка для NavigateTop, чтобы установить z-indeх
const NavigateTopWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1101, // Установите z-index равным или больше, чем у AppBar, чтобы NavigateTop был поверх AppBar
  flexWrap: 'wrap',
  background: toolbarTobAndBottomColor,
});

const NavigateTop: React.FC<Props> = ({ close }) => {
  const menu = [
    {
      name: 'Новинки',
      link: '/productsNews',
    },
    {
      name: 'Контакты',
      link: '/contacts',
    },
    {
      name: 'О нас',
      link: '/about',
    },
  ];
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:760px)');
  const isMobileMenu = useMediaQuery('@media (min-width: 1200px)');
  const user = useAppSelector(selectUser);
  const component = (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      sx={{
        '@media (max-width: 1200px)': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        },
      }}
    >
      <Box>
        <Link to="/" style={{ margin: 'auto' }}>
          <img style={{ maxWidth: '170px' }} src="/logo_black.png" alt="passage" />
        </Link>
      </Box>

      <Box display="flex" flexWrap={'wrap'} alignItems={'center'} sx={{ padding: '7px' }}>
        <Box
          sx={{
            '@media (max-width: 1200px)': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            },
          }}
          display="flex"
          justifyContent={!isMobile ? 'center' : 'start'}
          alignItems={'center'}
        >
          <Box
            sx={{
              '@media (max-width: 1200px)': {
                display: 'none',
              },
            }}
          >
            <MenuCategoriesTop />
          </Box>

          {menu.map((item) => (
            <Button sx={ToolBarTopText} onClick={close} component={Link} to={item.link} key={item.name}>
              {item.name}
            </Button>
          ))}
          <ForUsers close={close} />
        </Box>
      </Box>

      <Box>
        {isMobileMenu && (
          <Box>
            <LinkTel />
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button sx={ToolBarTopTextSearchBasket} color="inherit">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SearchIcon fontSize={'medium'} />
            <p style={{ fontSize: '9px', margin: 0, padding: 0 }}>Поиск</p>
          </div>
        </Button>

        <Basket />
      </Box>

      <Box display={user !== null || location.pathname === '/admin' ? 'flex' : 'none'} alignItems="center">
        {user && <UserMenu close={close} user={user} />}
        {location.pathname === '/admin' && !user && <AnonymousMenu close={close} />}
      </Box>
    </Box>
  );

  const children = isMobileMenu ? <Container maxWidth={'xl'}>{component}</Container> : component;
  return <NavigateTopWrapper>{children}</NavigateTopWrapper>;
};

export default NavigateTop;
