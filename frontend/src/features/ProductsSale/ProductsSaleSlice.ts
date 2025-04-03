import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types';
import { RootState } from '../../app/store';
import { fetchProductsSale } from './ProductsSaleThunks';

interface ProductsSaleState {
  productsSale: ProductType[];
  fetchProductsSaleLoading: boolean;
}

const initialState: ProductsSaleState = {
  productsSale: [],
  fetchProductsSaleLoading: false,
};

export const productsSaleSLice = createSlice({
  name: 'productsSale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsSale.pending, (state) => {
      state.fetchProductsSaleLoading = true;
    });
    builder.addCase(fetchProductsSale.fulfilled, (state, action) => {
      state.productsSale = action.payload;
      state.fetchProductsSaleLoading = false;
    });
    builder.addCase(fetchProductsSale.rejected, (state) => {
      state.fetchProductsSaleLoading = false;
    });
  },
});

export const productsSaleReducer = productsSaleSLice.reducer;

export const selectProductsSale = (state: RootState) => state.productsSale.productsSale;
export const selectFetchProductsSaleLoading = (state: RootState) => state.productsSale.fetchProductsSaleLoading;
