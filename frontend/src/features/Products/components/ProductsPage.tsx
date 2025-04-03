import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategory, selectFetchOneCategoriesLoading } from '../../MenuCategories/menuCategoriesSlice';
import { fetchOneCategories } from '../../MenuCategories/menuCategoriesThunks';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Products from './Products';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const categoryOne = useAppSelector(selectCategory);
  const categoryLoading = useAppSelector(selectFetchOneCategoriesLoading);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCategories(id));
    }
  }, [dispatch, id]);

  if (categoryLoading) return <Spinner />;

  return (
    <Box sx={{ display: 'flex', margin: 'auto', gap: 3, padding: 2 }}>
      {/* Фильтры слева */}

      <Box
        sx={{
          width: '260px',
          backgroundColor: '#f9f9f9',
          padding: 2,
          borderRadius: '8px',
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Фильтры
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Категории
        </Typography>
        <FormControlLabel control={<Checkbox />} label="Телевизоры" />
        <FormControlLabel control={<Checkbox />} label="Ноутбуки" />
        <FormControlLabel control={<Checkbox />} label="Смартфоны" />
        <FormControlLabel control={<Checkbox />} label="Наушники" />

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Цена
        </Typography>
        <FormControlLabel control={<Checkbox />} label="До 10 000 ₽" />
        <FormControlLabel control={<Checkbox />} label="10 000 - 50 000 ₽" />
        <FormControlLabel control={<Checkbox />} label="50 000 - 100 000 ₽" />
        <FormControlLabel control={<Checkbox />} label="100 000+ ₽" />
      </Box>

      {/* Товары справа */}
      <Box sx={{ width: '75%' }}>
        <Products categoryName={categoryOne} />
      </Box>
    </Box>
  );
};

export default ProductsPage;
