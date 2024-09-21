import React, { useCallback } from 'react';
import {Box, Button, CircularProgress, Divider, Grid, Typography} from '@mui/material';
import { ProductInfo } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../../../constans';
import {selectUser} from '../../User/usersSlice';
import {selectDeleteLoading} from '../productSlice';
import {deleteProduct} from '../productThunks';
import Category from '../../Categories/components/Category';

interface Props {
  product: ProductInfo;
}

const OneProduct: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectDeleteLoading);
  const cardImage = API_URL + '/' + product.image;

  const onDeleteProduct = useCallback(async () => {
    await dispatch(deleteProduct(product._id)).unwrap();
    navigate('/');
  }, [dispatch, navigate, product._id]);

  return (
    <>
      <Grid container spacing={4} mx="auto" mt="60px">
        <Grid item xs={6}>
          <Box
            sx={{ height: '450px', overflow: 'hidden', borderRadius: '12px' }}
          >
            <img
              src={cardImage}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Category title={product.category.title} />
          <Typography variant="h4" component="h1" mt={3} mb={6}>
            {product.title}
          </Typography>
          <Box>
            <Typography variant="subtitle1" mb={1} fontWeight="bold">
              Description
            </Typography>
            <Typography variant="body1" mb={3}>
              {product.description}
            </Typography>
            <Divider />
          </Box>
          <Box
            mt={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box mb={6}>
              <Typography variant="subtitle1">
                Price: {product.price} KGS
              </Typography>
              <Typography variant="subtitle1">
                Mobile: {product.user.phone}
              </Typography>
              <Typography variant="subtitle1">
                Salesman: {product.user.displayName}
              </Typography>
            </Box>
            <Box>
              {product.user._id === user?._id && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={onDeleteProduct}
                  disabled={deleting}
                >
                  {deleting ? <CircularProgress size={24}/> : 'Delete'}
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default OneProduct;