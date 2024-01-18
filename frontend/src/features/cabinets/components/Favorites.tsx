import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProductType } from '../../../types';
import { selectFavoriteProducts, selectFetchFavoriteProductsLoading } from '../../Products/productsSlise';
import { getFavoriteProducts } from '../../Products/productsThunks';
import { selectBasket } from '../../Basket/basketSlice';
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery } from '@mui/material';
import ProductCard from '../../Products/components/ProductCard';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { fetchBasket } from '../../Basket/basketThunks';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector(selectFavoriteProducts);
  const favoriteProductsLoading = useAppSelector(selectFetchFavoriteProductsLoading);
  const basket = useAppSelector(selectBasket);

  const indicator = (item: ProductType) => {
    if (basket?.items && item) {
      return basket?.items.some((itemBasket) => itemBasket.product._id === item._id);
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(getFavoriteProducts());
    dispatch(fetchBasket('1'));
  }, [dispatch]);

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <>
      <Typography variant={'h5'} textAlign={'center'}>
        Избранные товары
      </Typography>
      {favoriteProductsLoading ? (
        <Spinner />
      ) : (
        <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={1} mb={2}>
          {favoriteProducts.map((item) => {
            return (
              <Grid item key={item._id}>
                <ProductCard product={item} indicator={indicator(item)} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Favorites;
