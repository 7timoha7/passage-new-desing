import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { CategoriesType, CategoryImageType } from '../../types';
import { categoriesImageFetch, fetchCategories, fetchOneCategories } from './menuCategoriesThunks';

interface CategoriesState {
  categories: CategoriesType[];
  category: CategoriesType | null;
  fetchAllCategoriesLoading: boolean;
  fetchOneCategoriesLoading: boolean;
  error: boolean;
  categoriesImage: CategoryImageType[];
}

const initialState: CategoriesState = {
  categories: [],
  category: null,
  error: false,
  fetchAllCategoriesLoading: false,
  fetchOneCategoriesLoading: false,
  categoriesImage: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchAllCategoriesLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.fetchAllCategoriesLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchAllCategoriesLoading = false;
    });

    builder.addCase(fetchOneCategories.pending, (state) => {
      state.fetchOneCategoriesLoading = true;
    });
    builder.addCase(fetchOneCategories.fulfilled, (state, action) => {
      state.category = action.payload;
      state.fetchOneCategoriesLoading = false;
    });
    builder.addCase(fetchOneCategories.rejected, (state) => {
      state.fetchOneCategoriesLoading = false;
    });

    builder.addCase(categoriesImageFetch.pending, (state) => {
      state.fetchAllCategoriesLoading = true;
    });
    builder.addCase(categoriesImageFetch.fulfilled, (state, action) => {
      state.categoriesImage = action.payload;
      state.fetchAllCategoriesLoading = false;
    });
    builder.addCase(categoriesImageFetch.rejected, (state) => {
      state.fetchAllCategoriesLoading = false;
    });
  },
});
export const categoriesReducer = categoriesSlice.reducer;

export const selectFetchAllCategoriesLoading = (state: RootState) => state.categories.fetchAllCategoriesLoading;
export const selectFetchOneCategoriesLoading = (state: RootState) => state.categories.fetchOneCategoriesLoading;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectCategoriesImage = (state: RootState) => state.categories.categoriesImage;
