import React from 'react';
import { Backdrop, CircularProgress, Grid, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProductsFromApiLoading } from '../../Products/productsSlice';
import { productsFromApi } from '../../Products/productsThunks';
import { fetchCategories } from '../../MenuCategories/menuCategoriesThunks';
import { btnColorUpdateBase } from '../../../styles';

const UpdateBase = () => {
  const dispatch = useAppDispatch();
  const loadingApi = useAppSelector(selectProductsFromApiLoading);
  const clickUpdate = async () => {
    await dispatch(productsFromApi());
    await dispatch(fetchCategories());
  };

  return (
    <>
      <Paper sx={{ minHeight: '300px', p: 3 }}>
        <Grid container>
          <Grid item textAlign={'center'}>
            <h4>Для того чтобы обновить базу данных с базы 1С, нажмите данную кнопку и дождитесь обновления!</h4>
            <LoadingButton
              sx={btnColorUpdateBase}
              loading={loadingApi}
              onClick={() => clickUpdate()}
              variant={'contained'}
            >
              Обновить базу
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }} open={loadingApi}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default UpdateBase;
