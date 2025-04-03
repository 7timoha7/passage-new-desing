import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProductLoading, selectProductOne } from '../productsSlice';
import { productFetch } from '../productsThunks';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ProductFullCard from './ProductFullCard';
import React from 'react';

const ProductFullPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const loading = useAppSelector(selectProductLoading);
  const productOne = useAppSelector(selectProductOne);

  useEffect(() => {
    dispatch(productFetch(id));
  }, [dispatch, id]);

  return loading ? <Spinner /> : <>{productOne && <ProductFullCard product={productOne} />}</>;
};

export default ProductFullPage;
