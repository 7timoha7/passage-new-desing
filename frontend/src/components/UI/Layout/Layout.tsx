import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProductsForID, setProductsForID } from '../../../features/ProductsFor/productsForSlice';
import { selectBanners, selectFetchBannersLoading } from '../../../features/Banners/bannersSlice';
import { fetchBanners } from '../../../features/Banners/bannersThunks';

import AppToolbar from '../AppToolbar/AppToolbar';
import MenuCategories from '../../../features/MenuCategories/components/MenuCategories';
import Footer from '../Footer/Footer';
import Bestsellers from '../../../features/Bestsellers/Bestsellers';
import ProductsNews from '../../../features/Products/components/ProductsNews';
import ProductsFor from '../../../features/ProductsFor/components/ProductsFor';
import BannerTop from '../../../features/Banners/BannerTop';
import BannersMiddle from '../../../features/Banners/BannersMiddle';
import BannersBottom from '../../../features/Banners/BannersBottom';
import CategoriesMainPage from '../../../features/MenuCategories/components/CategoriesMainPage';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:1200px)');
  const location = useLocation();
  const dispatch = useAppDispatch();

  const productsForID = useAppSelector(selectProductsForID);
  const banners = useAppSelector(selectBanners);
  const fetchBannersLoading = useAppSelector(selectFetchBannersLoading);

  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (!location.pathname.includes('/product/')) {
      dispatch(setProductsForID(null));
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (toolbarRef.current) {
        setToolbarHeight(toolbarRef.current.offsetHeight);
      }
    };

    // Сначала обновим хедер после первой загрузки с небольшой задержкой
    const timer = setTimeout(handleResize, 100);

    // Пересчитываем при изменении окна
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив зависимостей, чтобы сработало один раз при монтировании

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Фиксированный хедер */}
      <header
        ref={toolbarRef}
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1100, borderBottom: '1px solid grey' }}
      >
        <AppToolbar />
      </header>

      {/* Отступ под фиксированный хедер */}
      <Box sx={{ height: `${toolbarHeight}px` }} />

      <MenuCategories />

      {location.pathname === '/' && (
        <Box>
          <BannerTop loadingFetch={fetchBannersLoading} banners={banners} />
        </Box>
      )}

      <Container maxWidth="xl" sx={{ mb: 2, mt: `${toolbarHeight - 70}px` }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
          <Box maxWidth="100%" component="main" sx={{ flex: 1, boxSizing: 'border-box' }}>
            {children}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 2 }}>
        {location.pathname === '/' && <Bestsellers />}
      </Container>

      {location.pathname === '/' && (
        <Container maxWidth="xl" sx={{ mb: 2 }}>
          <CategoriesMainPage />
        </Container>
      )}

      <Container maxWidth="xl" sx={{ mb: 2 }}>
        {location.pathname.includes('/product/') && productsForID && <ProductsFor categoriesID={productsForID} />}
        {location.pathname === '/' && <ProductsNews />}
      </Container>

      {/* Футер */}
      <footer style={{ flexShrink: 0, marginTop: 'auto' }}>
        <Footer />
      </footer>
    </Box>
  );
};

export default Layout;
