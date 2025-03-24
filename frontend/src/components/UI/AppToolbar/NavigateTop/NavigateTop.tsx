import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MenuCategoriesNew from '../../../../features/MenuCategories/components/MenuCategoriesNew';
import { Button, Container, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import UserMenu from '../UserMenu';
import AnonymousMenu from '../AnonymousMenu';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../features/users/usersSlice';
import { toolbarTobAndBottomColor, ToolBarTopText, ToolBarTopTextSearchBasket } from '../../../../styles';
import SearchIcon from '@mui/icons-material/Search';
import Basket from '../../../../features/Basket/Basket';
import LinkTel from './Components/LinkTel';

interface Props {
  close?: () => void;
}

const NavigateTopWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1101,
  flexWrap: 'wrap',
  background: toolbarTobAndBottomColor,
});

const CatalogDropdown = styled(Box)({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  background: '#fff',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '5px 0',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  borderTop: '2px solid gray',
});

const NavigateTop: React.FC<Props> = ({ close }) => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const catalogButtonRef = useRef<HTMLButtonElement | null>(null);

  const menu = [
    { name: 'Контакты', link: '/contacts' },
    { name: 'О нас', link: '/about' },
  ];

  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:760px)');
  const isMobileMenu = useMediaQuery('(min-width: 1200px)');
  const user = useAppSelector(selectUser);

  // Обработчик клика вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        catalogRef.current &&
        !catalogRef.current.contains(event.target as Node) &&
        catalogButtonRef.current &&
        !catalogButtonRef.current.contains(event.target as Node)
      ) {
        setCatalogOpen(false);
      }
    };

    if (catalogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [catalogOpen]);

  return (
    <NavigateTopWrapper>
      {isMobileMenu ? (
        <Container maxWidth={'xl'}>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box>
              <Link to="/" style={{ margin: 'auto' }}>
                <img style={{ maxWidth: '200px' }} src="/logo_brown_black.png" alt="passage" />
              </Link>
            </Box>

            <Box display="flex" flexWrap={'wrap'} alignItems={'center'} sx={{ padding: '7px' }}>
              <Box display="flex" justifyContent={!isMobile ? 'center' : 'start'} alignItems={'center'}>
                <Button ref={catalogButtonRef} sx={ToolBarTopText} onClick={() => setCatalogOpen((prev) => !prev)}>
                  Каталог
                </Button>

                {menu.map((item) => (
                  <Button sx={ToolBarTopText} onClick={close} component={Link} to={item.link} key={item.name}>
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Box>

            {isMobileMenu && <LinkTel />}

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
        </Container>
      ) : (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          {/* Контент для мобильных */}
        </Box>
      )}

      {/* Каталог */}
      {catalogOpen && (
        <CatalogDropdown ref={catalogRef}>
          <MenuCategoriesNew />
        </CatalogDropdown>
      )}
    </NavigateTopWrapper>
  );
};

export default NavigateTop;
