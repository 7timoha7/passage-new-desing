import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useParams } from 'react-router-dom';
import { BasketTypeOnServerMutation, ProductType } from '../../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  selectPageInfoSearch,
  selectSearchLoading,
  selectSearchResults,
} from '../../../../../features/Products/productsSlice';
import { selectBasket } from '../../../../../features/Basket/basketSlice';
import { searchProductsFull } from '../../../../../features/Products/productsThunks';
import ProductCard from '../../../../../features/Products/components/ProductCard';
import Spinner from '../../../Spinner/Spinner';

const SearchPage: React.FC = () => {
  const [stateBasket, setStateBasket] = useState<BasketTypeOnServerMutation | null>(null);
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const basket = useAppSelector(selectBasket);
  const pageInfo = useAppSelector(selectPageInfoSearch);
  const loading = useAppSelector(selectSearchLoading);
  const { text } = useParams<{ text: string }>();

  useEffect(() => {
    if (basket) {
      setStateBasket(basket);
    }
  }, [basket]);

  useEffect(() => {
    if (text) {
      dispatch(searchProductsFull({ text, page: 1 }));
    }
  }, [dispatch, text]);

  const indicator = (item: ProductType) =>
    stateBasket && item ? stateBasket.items.some((itemBasket) => itemBasket.product.goodID === item.goodID) : false;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (text) {
      dispatch(searchProductsFull({ text, page }));
    }
  };

  const renderPagination = () =>
    pageInfo && pageInfo.totalPages > 1 ? (
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
    ) : null;

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box>
      <Box textAlign="center" mb={2}>
        <Typography variant={'h4'}>Результат поиска для &ldquo;{text}&rdquo;</Typography>
      </Box>

      {renderPagination()}

      {loading ? (
        <Spinner />
      ) : searchResults.length > 0 ? (
        <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={2} mb={2} justifyContent={'center'}>
          {searchResults.map((item) => (
            <Grid item key={item._id}>
              <ProductCard product={item} indicator={indicator(item)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant={'subtitle1'} textAlign="center">
          No results found.
        </Typography>
      )}

      {renderPagination()}
    </Box>
  );
};

export default SearchPage;
