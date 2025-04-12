import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategory, selectFetchOneCategoriesLoading } from '../../MenuCategories/menuCategoriesSlice';
import { fetchOneCategories } from '../../MenuCategories/menuCategoriesThunks';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Products from './Products';
import React from 'react';

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

  return categoryLoading ? <Spinner /> : <Products categoryName={categoryOne} />;
};

export default ProductsPage;
