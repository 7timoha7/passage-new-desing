import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MenuCategoriesNew from '../../../../features/MenuCategories/components/MenuCategoriesNew';
import { Button, Container, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import UserMenu from '../UserMenu';
import AnonymousMenu from '../AnonymousMenu';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../features/users/usersSlice';
import { toolbarTobAndBottomColor, ToolBarTopText, ToolBarTopTextSearchBasket } from '../../../../styles';
import SearchIcon from '@mui/icons-material/Search';
import Basket from '../../../../features/Basket/Basket';
import LinkTel from './Components/LinkTel';
import ClientsMenuDropdown from '../../ClientsMenuDropdown/ClientsMenuDropdown';
import Search from './Components/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MobileOverlay from './MobileOverlay';

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

const NavigateTop: React.FC = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const catalogRef = useRef<HTMLDivElement | null>(null);
  const catalogButtonRef = useRef<HTMLButtonElement | null>(null);
  const clientsRef = useRef<HTMLDivElement | null>(null);
  const clientsButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const isMobileMenu = useMediaQuery('(min-width: 1200px)');
  const user = useAppSelector(selectUser);

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
      if (
        clientsRef.current &&
        !clientsRef.current.contains(event.target as Node) &&
        clientsButtonRef.current &&
        !clientsButtonRef.current.contains(event.target as Node)
      ) {
        setClientsOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCatalogOpen(false);
    setClientsOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <NavigateTopWrapper>
      {isMobileMenu ? (
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box>
              <Link to="/" style={{ margin: 'auto' }}>
                <img style={{ maxWidth: '200px' }} src="/logo_brown_black.png" alt="passage" />
              </Link>
            </Box>

            <Box display="flex" flexWrap="wrap" alignItems="center" sx={{ padding: '7px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography ref={catalogButtonRef} sx={ToolBarTopText} onClick={() => setCatalogOpen((prev) => !prev)}>
                  Каталог
                </Typography>

                <Typography sx={ToolBarTopText} component={Link} to="/contacts">
                  Контакты
                </Typography>
                <Typography sx={ToolBarTopText} component={Link} to="/about">
                  О нас
                </Typography>

                <Typography ref={clientsButtonRef} sx={ToolBarTopText} onClick={() => setClientsOpen((prev) => !prev)}>
                  Клиентам
                </Typography>
              </Box>
            </Box>

            <LinkTel />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                ref={searchButtonRef}
                onClick={() => setSearchOpen((prev) => !prev)}
                sx={ToolBarTopTextSearchBasket}
                color="inherit"
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <SearchIcon fontSize={'medium'} />
                  <p style={{ fontSize: '9px', margin: 0, padding: 0 }}>Поиск</p>
                </div>
              </Button>
              <Basket />
            </Box>

            <Box display={user !== null || location.pathname === '/admin' ? 'flex' : 'none'} alignItems="center">
              {user && <UserMenu user={user} />}
              {location.pathname === '/admin' && !user && <AnonymousMenu />}
            </Box>
          </Box>
        </Container>
      ) : (
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
          <Link to="/">
            <img style={{ height: 60 }} src="/logo_brown_black.png" alt="passage" />
          </Link>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              ref={searchButtonRef}
              sx={ToolBarTopTextSearchBasket}
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <SearchIcon />
            </IconButton>

            <LinkTel />

            <Basket />

            <IconButton sx={ToolBarTopTextSearchBasket} onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {catalogOpen && (
        <CatalogDropdown ref={catalogRef}>
          <MenuCategoriesNew close={() => setCatalogOpen(false)} />
        </CatalogDropdown>
      )}

      {clientsOpen && (
        <CatalogDropdown ref={clientsRef}>
          <ClientsMenuDropdown close={() => setClientsOpen(false)} />
        </CatalogDropdown>
      )}

      {searchOpen && (
        <CatalogDropdown ref={searchRef}>
          <Search />
        </CatalogDropdown>
      )}

      {!isMobileMenu && mobileMenuOpen && <MobileOverlay onClose={() => setMobileMenuOpen(false)} />}
    </NavigateTopWrapper>
  );
};

export default NavigateTop;
