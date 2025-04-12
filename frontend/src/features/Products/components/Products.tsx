import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProductCard from './ProductCard';
import { selectBasket } from '../../Basket/basketSlice';
import { fetchProductFilters, productsFetch } from '../productsThunks';
import {
  selectFilterOption,
  selectFilterOptionLoading,
  selectPageInfo,
  selectProductsLoading,
  selectProductsState,
} from '../productsSlice';
import { BasketTypeOnServerMutation, CategoriesType } from '../../../types';
import { themeBlackSelect } from '../../../theme';
import CloseIcon from '@mui/icons-material/Close';
import { orange } from '@mui/material/colors';
import TuneIcon from '@mui/icons-material/Tune';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
  categoryName: CategoriesType | null;
}

const Products: React.FC<Props> = ({ categoryName }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [stateBasket, setStateBasket] = useState<BasketTypeOnServerMutation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = useAppSelector(selectFilterOption);
  const pageInfo = useAppSelector(selectPageInfo);
  const basket = useAppSelector(selectBasket);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isMobileMenu = useMediaQuery('(min-width:1200px)');
  const productsInCategory = useAppSelector(selectProductsState);
  const filterLoading = useAppSelector(selectFilterOptionLoading);
  const productsLoading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    if (categoryName) {
      setName(categoryName.name);
    }
  }, [categoryName]);

  useEffect(() => {
    if (basket) setStateBasket(basket);
  }, [basket]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductFilters(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(productsFetch({ id, page, sort, filters: selectedFilters }));
    }
  }, [dispatch, id, page, selectedFilters, sort]);

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      const result = { ...prev, [key]: updated };
      if (result[key].length === 0) delete result[key];
      return result;
    });
    setPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setPage(1);
  };

  const isResetDisabled = Object.keys(selectedFilters).length === 0;

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

  const renderFilters = () => (
    <Box p={2} width={280} sx={{ background: '#f9f9f9', borderRadius: '10px', height: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Фильтры
        </Typography>
        <Button
          color={'inherit'}
          onClick={() => setDrawerOpen(false)}
          size="small"
          sx={{
            minWidth: 'auto',
            display: isMobileMenu ? 'none' : 'inline-flex',
          }}
        >
          <CloseIcon fontSize={'large'} />
        </Button>
      </Box>
      {filters.map((filter) => (
        <Box key={filter.key} mb={3}>
          <Typography textTransform="uppercase" variant="subtitle2" fontWeight="bold" mb={1}>
            {filter.key}
          </Typography>
          <Stack>
            {filter.values.map((value) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    sx={{
                      color: orange[800],
                      '&.Mui-checked': {
                        color: orange[600],
                      },
                    }}
                    size="small"
                    checked={selectedFilters[filter.key]?.includes(value) || false}
                    onChange={() => handleFilterChange(filter.key, value)}
                  />
                }
                label={
                  <Typography textTransform="uppercase" variant="body2">
                    {value}
                  </Typography>
                }
              />
            ))}
          </Stack>
        </Box>
      ))}
      <Box mt={3}>
        <Button
          disabled={isResetDisabled}
          onClick={handleResetFilters}
          variant="outlined"
          color="inherit"
          fullWidth
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Сбросить фильтры
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box mt={2}>
      <Typography variant="h4" fontWeight="bold" sx={{ ml: 2 }}>
        {name}
      </Typography>
      <Box mt={2} display="flex" gap={2}>
        {filterLoading ? (
          <Spinner />
        ) : (
          <>
            {isMobileMenu ? (
              <Box width="20%">{renderFilters()}</Box>
            ) : (
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {renderFilters()}
              </Drawer>
            )}
          </>
        )}

        <Box width={isMobileMenu ? '80%' : '100%'}>
          {/* Сортировка и кнопка фильтров */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: isMobileMenu ? 'flex-end' : 'space-between',
              alignItems: 'center',
              mb: 3,
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {!isMobileMenu && (
              <Button
                color={'inherit'}
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={() => setDrawerOpen(true)}
                sx={{ height: 40 }}
              >
                Фильтры
              </Button>
            )}

            <ThemeProvider theme={themeBlackSelect}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
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

          {/* Пагинация сверху */}
          {renderPagination()}

          {/* Сетка товаров */}
          {productsLoading ? (
            <Spinner />
          ) : (
            <Grid container spacing={isMobile ? 1 : 2} mt={3} mb={3} justifyContent="center">
              {productsInCategory.map((item) => (
                <Grid item key={item._id}>
                  <ProductCard
                    product={item}
                    indicator={stateBasket?.items.some((b) => b.product.goodID === item.goodID)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Пагинация снизу */}
          {renderPagination()}
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
