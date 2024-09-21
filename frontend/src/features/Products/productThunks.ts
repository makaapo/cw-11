import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product, ProductInfo, ProductMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const {data: product} = await axiosApi.get<Product[]>('products');
    return product;
  },
);

export const fetchByCategory = createAsyncThunk<Product[], string>(
  'products/fetchByCategory',
  async (category) => {
    const {data: product} = await axiosApi.get<Product[]>(
      `/products=` + category,
    );

    return product;
  },
);

export const fetchOneProduct = createAsyncThunk<ProductInfo | null, string>(
  'products/fetchOne',
  async (id) => {
    const {data: productInfo} = await axiosApi.get<ProductInfo | null>(
      `/products/${id}`,
    );
    return productInfo;
  },
);

export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState} >(
  'products/createProduct', async (product, {getState}) => {
    const token = getState().users.user?.token;

    const formData = new FormData();

    formData.append('category', product.category);
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);

    if (product.image) {
      formData.append('image', product.image);
    }

    await axiosApi.post('/products', formData, {
      headers: {'Authorization': `Bearer ${token}`},
    });
});

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('products/delete', async (id, {getState}) => {
  const token = getState().users.user?.token;
  await axiosApi.delete(`/products/${id}`, {
    headers: {'Authorization': `Bearer ${token}`},
  });
});