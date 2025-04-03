import { ProductType } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchProductsSale = createAsyncThunk<ProductType[]>('productsSale/fetchProductsSale', async () => {
  try {
    const response = await axiosApi.get<ProductType[]>('/products/productsSale');
    return response.data;
  } catch {
    throw new Error();
  }
});
