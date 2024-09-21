import { createAsyncThunk } from '@reduxjs/toolkit';
import {Category} from '../../types';
import axiosApi from '../../axiosApi';


export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const { data: categories } = await axiosApi.get<Category[]>('/categories');
  return categories;
});