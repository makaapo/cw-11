import React from 'react';
import { Grid, Typography } from '@mui/material';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../User/usersSlice';
import ProductForm from '../ProductForm/ProductForm';
import {ProductMutation} from '../../../types';
import {createProduct} from '../productThunks';

const NewProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const onFormSubmit = async (product: ProductMutation) => {
    await dispatch(createProduct(product)).unwrap();
    navigate('/');
  };

  return (
    <Grid container direction="column" mt="60px">
      <Typography variant="h4" component="h1" textAlign="center" mb={6}>
        Create new item
      </Typography>
      <ProductForm onSubmit={onFormSubmit}/>
    </Grid>
  );
};

export default NewProduct;