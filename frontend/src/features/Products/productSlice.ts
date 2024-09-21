import {ProductInfo} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createProduct, deleteProduct, fetchOneProduct, fetchProducts} from './productThunks';

interface ProductsState {
  items: ProductInfo[];
  item: ProductInfo | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
        state.fetchLoading = false;
        state.items = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOneProduct.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, {payload: product}) => {
        state.fetchOneLoading = false;
        state.item = product;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
  selectors: {
    selectProducts: (state) => state.items,
    selectProductsFetching: (state) => state.fetchLoading,
    selectProductCreating: (state) => state.createLoading,
    selectOneProduct: (state) => state.item,
    selectOneProductFetching: (state) => state.fetchOneLoading,
    selectDeleteLoading: (state) => state.deleteLoading,
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  selectProducts,
  selectProductsFetching,
  selectProductCreating,
  selectOneProduct,
  selectOneProductFetching,
  selectDeleteLoading,
} = productsSlice.selectors;