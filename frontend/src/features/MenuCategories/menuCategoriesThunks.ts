import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesType, CategoryImageType } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchCategories = createAsyncThunk<CategoriesType[]>('categories/fetchAll', async () => {
  try {
    const response = await axiosApi.get<CategoriesType[]>('/categories');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const fetchOneCategories = createAsyncThunk<CategoriesType, string>('categories/fetchOne', async (id) => {
  try {
    const response = await axiosApi.get<CategoriesType>('/categories/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const categoriesImageFetch = createAsyncThunk<CategoryImageType[], string[]>(
  'categories/categoriesImage',
  async (ids) => {
    console.log('Отправляем POST-запрос с ID:', ids);

    const response = await axiosApi.post<CategoryImageType[]>('/categories/random-images', {
      categoryIDs: ids, // Передаем массив в body
    });

    return response.data;
  },
);
