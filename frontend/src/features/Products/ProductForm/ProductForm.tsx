import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, MenuItem, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {ProductMutation} from '../../../types';
import {selectCategories} from '../../Categories/categoriesSlice';
import FileInput from '../../../UI/FileInput/FileInput';
import {fetchCategories} from '../../Categories/categoriesThunks';

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmitPost = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <>
      <Box component="form" onSubmit={onSubmitPost} mb={5}>
        <Grid container item xs={8} direction="column" spacing={2} mx="auto">
          <Grid item xs>
            <TextField
              required
              select
              fullWidth
              id="category"
              label="Category"
              value={state.category}
              onChange={inputChangeHandler}
              name={'category'}
            >
              <MenuItem value="" disabled>
                Please select a category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              type="title"
              value={state.title}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Description"
              name="description"
              type="description"
              multiline
              rows={4}
              value={state.description}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Price"
              name="price"
              type="price"
              multiline
              value={state.price}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
          </Grid>
          <Grid item xs={3} textAlign="center">
            <Button
              variant="contained"
              type="submit">
              Create Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductForm;