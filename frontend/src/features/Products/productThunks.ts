import {createAsyncThunk} from '@reduxjs/toolkit';
import {ProductInfo, ProductMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

export const fetchProducts = createAsyncThunk<ProductInfo[], string | undefined>(
  'products/fetchAll',
  async (categoryId) => {
    const { data: products } = await axiosApi.get<ProductInfo[]>(`/products`, { params: { category: categoryId } });
    return products;
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
export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState}
>('posts/createProduct', async (product, {getState}) => {
  try {
    const token = getState().users.user?.token;

    const formData = new FormData();

    formData.append('category', product.category);
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);

    if (product.image) {
      formData.append('image', product.image);
    }
    await axiosApi.post('products', formData, {
      headers: {'Authorization': `Bearer ${token}`},
    });
  } catch (e) {

    throw e;
  }
});

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('products/delete', async (id, {getState}) => {
  const token = getState().users.user?.token;
  console.log(token);
  await axiosApi.delete(`/products/${id}`, {
    headers: {'Authorization': `Bearer ${token}`},
  });
});