// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userAuthReducer from '../reducers/userSlices/UserAuthSlice';
import restaurantAuthReducer from '../reducers/restaurantSlices/RestaurantAuthSlice';
import restaurantsReducer from '../reducers/userSlices/RestaurantSearchSlice'
import { useDispatch } from 'react-redux';

const persistConfig = {
   key: 'root',
   storage,
};

const rootReducer = combineReducers({
   userAuth: userAuthReducer,
   restaurantAuth: restaurantAuthReducer,
   restaurantSearch : restaurantsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store




