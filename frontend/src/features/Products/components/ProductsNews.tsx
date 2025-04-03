import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProductsNews, selectProductsNewsLoading } from '../productsSlice';
import { productsFetchNews } from '../productsThunks';
import { selectBasket } from '../../Basket/basketSlice';
import { ProductType } from '../../../types';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ProductsNews = () => {
  const productsNews = useAppSelector(selectProductsNews);
  const productsNewsLoading = useAppSelector(selectProductsNewsLoading);
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productsFetchNews());
  }, [dispatch]);

  const indicator = (item: ProductType) => {
    if (basket && basket.items.length && item) {
      return basket.items.some((itemBasket) => itemBasket.product.goodID === item.goodID);
    } else {
      return false;
    }
  };

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      sx={{
        pt: 2,
        pb: 3,
      }}
    >
      <Box mb={2} mt={2}>
        <Typography variant="h4">НОВИНКИ</Typography>
      </Box>

      {productsNewsLoading ? (
        <Spinner />
      ) : (
        <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={2} mb={3} justifyContent={'center'}>
          {productsNews &&
            productsNews.length &&
            productsNews.map((item) => (
              <Grid item key={item._id}>
                <ProductCard product={item} indicator={indicator(item)} />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductsNews;
