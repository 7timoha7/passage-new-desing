import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { BasketTypeOnServerMutation, CategoriesType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProductCard from './ProductCard';
import { selectBasket } from '../../Basket/basketSlice';
import { productsFetch } from '../productsThunks';
import { selectPageInfo, selectProductsState } from '../productsSlice';
import { themeBlackSelect } from '../../../theme';

interface Props {
  categoryName: CategoriesType | null;
}

const Products: React.FC<Props> = ({ categoryName }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [sort, setSort] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [stateBasket, setStateBasket] = useState<BasketTypeOnServerMutation | null>(null);

  const productsInCategory = useAppSelector(selectProductsState);
  const basket = useAppSelector(selectBasket);
  const pageInfo = useAppSelector(selectPageInfo);

  useEffect(() => {
    if (basket) {
      setStateBasket(basket);
    }
  }, [basket]);

  useEffect(() => {
    if (id) {
      dispatch(productsFetch({ id, page, sort }));
    }
    if (categoryName) {
      setName(categoryName.name);
    }
  }, [categoryName, dispatch, id, page, sort]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
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
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="small"
            />
          </Stack>
        </Box>
      );
    }
    return null;
  };

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box mt={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={2}>
        <Typography variant="h4" fontWeight="bold" style={{ marginLeft: '2%' }}>
          {name}
        </Typography>

        <Box sx={{ minWidth: 200 }}>
          <ThemeProvider theme={themeBlackSelect}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-select-label">Сортировать по:</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sort}
                label="Сортировать по:"
                onChange={handleSortChange}
              >
                <MenuItem value="">По умолчанию</MenuItem>
                <MenuItem value="price_asc">Цена (по возрастанию)</MenuItem>
                <MenuItem value="price_desc">Цена (по убыванию)</MenuItem>
                <MenuItem value="name_asc">Название (А-Я)</MenuItem>
                <MenuItem value="name_desc">Название (Я-А)</MenuItem>
                <MenuItem value="newest">Новинки</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
        </Box>
      </Box>

      {renderPagination()}

      <Grid container spacing={isSmallScreen ? 1 : 2} mt={2} mb={2} justifyContent="center">
        {productsInCategory.map((item) => (
          <Grid item key={item._id}>
            <ProductCard product={item} indicator={stateBasket?.items.some((b) => b.product.goodID === item.goodID)} />
          </Grid>
        ))}
      </Grid>

      {renderPagination()}
    </Box>
  );
};

export default Products;
