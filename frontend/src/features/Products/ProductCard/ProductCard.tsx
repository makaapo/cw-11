import React from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {API_URL} from '../../../constans';

import {ProductInfo} from '../../../types';
import Category from '../../Categories/components/Category';


const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  product: ProductInfo;
}

const ProductItem: React.FC<Props> = ({product}) => {
  const cardImage = API_URL + '/' + product.image;

  return (
    <Grid item sx={{ width: '300px' }}>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={product.title} />
        <ImageCardMedia image={cardImage} title={product.title} />
        <CardContent>
          <Category title={product.category.title} />
          <strong>Price: {product.price} KGS</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/products/${product._id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;