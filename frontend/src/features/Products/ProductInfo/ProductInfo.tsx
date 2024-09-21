import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectOneProduct, selectOneProductFetching} from '../productSlice';
import {fetchOneProduct} from '../productThunks';
import {CircularProgress} from '@mui/material';
import OneProduct from '../OneProduct/OneProduct';


const ProductInfo: React.FC = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const isLoading = useAppSelector(selectOneProductFetching);

  const fetchProduct = useCallback(async () => {
    await dispatch(fetchOneProduct(id)).unwrap();
  }, [dispatch, id]);

  useEffect(() => {
    void fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      {isLoading && <CircularProgress />}
      {product && <OneProduct product={product} />}
    </>
  );
};

export default ProductInfo;