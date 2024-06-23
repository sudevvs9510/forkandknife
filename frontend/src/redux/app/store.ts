// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userAuthReducer from '../reducers/auth/UserAuthSlice';
import restaurantAuthReducer from '../reducers/auth/RestaurantAuthSlice';

const persistConfig = {
   key: 'root',
   storage,
};

const rootReducer = combineReducers({
   userAuth: userAuthReducer,
   restaurantAuth: restaurantAuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // Ignore these action types
            ignoredActions: [
               'persist/PERSIST',
               'persist/REHYDRATE',
               'persist/REGISTER',
            ],
            // Ignore these field paths in all actions
            ignoredPaths: ['payload'],
         },
      }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
