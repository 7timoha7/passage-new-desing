import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '../features/users/usersSlice';
import { categoriesReducer } from '../features/MenuCategories/menuCategoriesSlice';
import { productsReducer } from '../features/Products/productsSlice';
import { basketReducer } from '../features/Basket/basketSlice';
import { ordersReducer } from '../features/Order/orderSlice';
import { bestsellersReducer } from '../features/Bestsellers/bestsellersSlice';
import { bannersReducer } from '../features/Banners/bannersSlice';
import { productsForReducer } from '../features/ProductsFor/productsForSlice';
import { designerReducer } from '../components/UI/AppToolbar/NavigateTop/Components/ForClients/ForUsers/Designers/designersSlice';
import { discountsReducer } from '../features/GetADiscount/discountsSlice';
import { productsSaleReducer } from '../features/ProductsSale/ProductsSaleSlice';

const usersPersistConfig = {
  key: 'passage:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  categories: persistReducer(usersPersistConfig, categoriesReducer),
  products: persistReducer(usersPersistConfig, productsReducer),
  productsFor: persistReducer(usersPersistConfig, productsForReducer),
  basket: persistReducer(usersPersistConfig, basketReducer),
  orders: persistReducer(usersPersistConfig, ordersReducer),
  bestsellers: persistReducer(usersPersistConfig, bestsellersReducer),
  banners: persistReducer(usersPersistConfig, bannersReducer),
  designer: persistReducer(usersPersistConfig, designerReducer),
  discounts: persistReducer(usersPersistConfig, discountsReducer),
  productsSale: persistReducer(usersPersistConfig, productsSaleReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
