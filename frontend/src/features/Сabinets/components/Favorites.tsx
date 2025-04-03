import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProductType } from '../../../types';
import {
  selectFavoriteProducts,
  selectFetchFavoriteProductsLoading,
  selectPageInfo,
} from '../../Products/productsSlice';
import { getFavoriteProducts } from '../../Products/productsThunks';
import { selectBasket } from '../../Basket/basketSlice';
import Typography from '@mui/material/Typography';
import { Box, Grid, Stack, useMediaQuery } from '@mui/material';
import ProductCard from '../../Products/components/ProductCard';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { fetchBasket } from '../../Basket/basketThunks';
import Pagination from '@mui/material/Pagination';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector(selectFavoriteProducts);
  const favoriteProductsLoading = useAppSelector(selectFetchFavoriteProductsLoading);
  const basket = useAppSelector(selectBasket);
  const pageInfo = useAppSelector(selectPageInfo);

  const indicator = (item: ProductType) => {
    if (basket?.items && item) {
      return basket?.items.some((itemBasket) => itemBasket.product.goodID === item.goodID);
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(getFavoriteProducts(1));
    dispatch(fetchBasket('1'));
  }, [dispatch]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(getFavoriteProducts(page));
  };

  const renderPagination = () => {
    if (pageInfo && pageInfo.totalPages > 1) {
      return (
        <Box display="flex" justifyContent="center">
          <Stack spacing={2}>
            <Pagination
              showFirstButton
              showLastButton
              count={pageInfo.totalPages}
              page={pageInfo.currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size={'small'}
            />
          </Stack>
        </Box>
      );
    }
    return null;
  };

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <>
      <Typography variant={'h5'} textAlign={'center'}>
        Избранные товары
      </Typography>
      {favoriteProducts ? (
        <>
          {favoriteProductsLoading ? (
            <Spinner />
          ) : (
            <>
              {renderPagination()}
              <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={2} mb={2} justifyContent={'center'}>
                {favoriteProducts.map((item) => (
                  <Grid item key={item._id}>
                    <ProductCard product={item} indicator={indicator(item)} />
                  </Grid>
                ))}
              </Grid>
              {renderPagination()}
            </>
          )}
        </>
      ) : (
        <Typography variant={'h5'} textAlign={'center'}>
          Пусто
        </Typography>
      )}
    </>
  );
};

export default Favorites;
