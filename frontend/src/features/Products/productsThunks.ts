import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalSuccess,
  PageInfo,
  ProductsSearchPreview,
  ProductType,
  ProductTypeMutation,
  ValidationError,
} from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

export const productsFetch = createAsyncThunk<
  { products: ProductType[]; pageInfo: PageInfo },
  { id: string; page: number }
>('products/fetch', async ({ id, page }) => {
  const response = await axiosApi.get(`/products?category=${id}&page=${page}`);
  return response.data;
});

export const productsFetchNews = createAsyncThunk<{ products: ProductType[] }>('products/fetchNews', async () => {
  const response = await axiosApi.get(`/products/news`);
  return response.data;
});

export const productFetch = createAsyncThunk<ProductType, string>('products/fetchOne', async (id) => {
  const products = await axiosApi.get<ProductType>('/products/' + id);
  return products.data;
});

export const productsFromApi = createAsyncThunk<GlobalSuccess>('products/fetchFromApi', async () => {
  const products = await axiosApi.get('/productsFromApi/');
  return products.data;
});

export const getFavoriteProducts = createAsyncThunk<{ products: ProductType[]; pageInfo: PageInfo }, number>(
  'products/getFavoriteProducts',
  async (page) => {
    try {
      const responseFavoriteProducts = await axiosApi.get(`/products/get/favorites?page=${page}`);
      return responseFavoriteProducts.data;
    } catch {
      throw new Error();
    }
  },
);

export const editProduct = createAsyncThunk<
  GlobalSuccess,
  ProductTypeMutation,
  {
    state: RootState;
    rejectValue: ValidationError;
  }
>('products/editProduct', async (product, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;
    if (user) {
      const formData = new FormData();

      formData.append('name', product.name);
      formData.append('article', product.article);
      formData.append('goodID', product.goodID);
      formData.append('measureCode', product.measureCode);
      formData.append('measureName', product.measureName);
      formData.append('ownerID', product.ownerID);
      formData.append('quantity', product.quantity.toString());
      formData.append('price', product.price.toString());

      if (product.images) {
        for (const image of product.images) {
          if (image) {
            formData.append('images', image);
          }
        }
      }

      const response = await axiosApi.patch(`/products/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const removeProductImage = createAsyncThunk<
  void,
  {
    productId: string;
    imageIndex: number;
  }
>('products/removeImage', async ({ productId, imageIndex }) => {
  try {
    await axiosApi.delete(`/products/${productId}/images/${imageIndex}`);
  } catch {
    throw new Error();
  }
});

export const searchProductsFull = createAsyncThunk<
  { products: ProductType[]; pageInfo: PageInfo },
  { text: string; page: number }
>('products/search', async ({ text, page }) => {
  try {
    const response = await axiosApi.get(`/products/search/get?text=${text}&page=${page}`);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const searchProductsPreview = createAsyncThunk<ProductsSearchPreview, { text: string }>(
  'products/searchPreview',
  async ({ text }) => {
    try {
      const response = await axiosApi.get(`/products/search/preview?text=${text}`);
      return response.data;
    } catch {
      throw new Error();
    }
  },
);
