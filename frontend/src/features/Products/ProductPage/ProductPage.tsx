import React, {useEffect, useMemo} from 'react';
import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectProducts, selectProductsFetching} from '../productSlice';
import {fetchProducts} from '../productThunks';
import ProductCard from '../ProductCard/ProductCard';
import CategoriesMenu from '../../Categories/components/CategoriesMenu';
import {selectCategories} from '../../Categories/categoriesSlice';
import {useParams} from 'react-router-dom';
import {fetchCategories} from '../../Categories/categoriesThunks';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectProductsFetching);
  const {categoryId} = useParams();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(categoryId));
  }, [dispatch, categoryId]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no products here!
    </Alert>
  );

  if (isLoading) {
    content = <CircularProgress />;
  } else if (products.length > 0) {
    content = products.map((product) => (
      <ProductCard product={product} />
    ));

  }

  const pageTitle = useMemo(() => {
    if (!categoryId) {
      return 'All products';
    }
    const category = categories.find((category) => category._id === categoryId);
    if (!category) {
      return '...';
    }
    return category.title;
  }, [categories, categoryId]);

  return (
    <Grid container spacing={2}>
      <Grid item sx={{ width: 200 }}>
        <CategoriesMenu categories={categories} />
      </Grid>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">{pageTitle}</Typography>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          {isLoading && <CircularProgress />}
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};


export default ProductsPage;