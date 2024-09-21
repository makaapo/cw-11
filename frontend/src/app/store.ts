import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import {usersReducer} from '../features/User/usersSlice';
import {categoriesReducer} from '../features/Categories/categoriesSlice';
import {productsReducer} from '../features/Products/productSlice';


const usersPersistConfig = {
  key: 'mySpotify:users',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;