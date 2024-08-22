/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantLoginApi, logoutRestaurant } from "../../../api/RestaurantApis";
import { setStorageItem, removeStorageItem } from "../../../util/localStorage";
import { PURGE } from "redux-persist";

interface Credentials {
  email: string | undefined;
  password: string;
}

interface RestoAuthState {
  restaurant: any;
  token: string | null;
  error: string | null;
  loading: boolean;
  restaurantId: string | null; 
  role: string | null;
}

const initialState: RestoAuthState = {
  restaurant: null,
  token: null,
  error: null,
  loading: false,
  restaurantId: null,
  role: null,
};

export const login = createAsyncThunk(
  "restaurant/login",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await RestaurantLoginApi(credentials);
      setStorageItem("RestaurantAuthToken", response.token);
      return response;
    } catch (error) {
      return rejectWithValue("Invalid email or password");
    }
  }
);


export const logout = createAsyncThunk(
  "restaurant/logout",
  async (_, { rejectWithValue, dispatch }) => {
     try {
       console.log("logoutauthtoken")
        await logoutRestaurant(); 
        removeStorageItem('RestaurantAuthToken'); 
        dispatch({ type: PURGE, result: () => null })
        return true
     } catch (error) {
        return rejectWithValue("Failed to logout");
     }
  }
);

const restaurantAuthSlice = createSlice({
  name: "restaurantAuth",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.restaurant = null;
    //   state.token = null;
    //   state.error = null;
    //   state.loading = false;
    //   state.restaurantId = null;
    //   state.role = null;
    //   removeStorageItem("AuthToken");
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.restaurant = action.payload.restaurant;
        state.token = action.payload.token;
        state.restaurantId = action.payload.restaurant._id
        state.role = action.payload.restaurant.role;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logout.pending,(state) =>{
        state.loading = true
        state.error = null 
     })
     .addCase(logout.fulfilled,(state)=>{
        state.restaurant = null
        state.token = null
        state.loading = false
        state.error = null 
     })
     .addCase(logout.rejected,(state,action: PayloadAction<any>)=>{
        state.loading = false
        state.error = action.payload
     })
  },
});


export default restaurantAuthSlice.reducer;

