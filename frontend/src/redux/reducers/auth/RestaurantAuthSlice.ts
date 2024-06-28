import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantLoginApi } from "../../../api/RestaurantApis"
import { setStorageItem, removeStorageItem } from "../../../util/localStorage";


export interface credentials {
  email : string  | undefined
  password: string
}


interface restoAuthState {
  restaurant: null
  token: string | null;
  error: string | null;
  loading: boolean;
}

const initialState : restoAuthState = {
  restaurant: null,
  token: null,
  error: null,
  loading: false 
}


export const login = createAsyncThunk(
  "restaurant/login",
  async (credentials: credentials, { rejectWithValue}) =>{
    try{
      const response = await RestaurantLoginApi(credentials)
      setStorageItem('AuthToken', response.data.token)
      return response.data
    } catch(error){
      return rejectWithValue("Invalid email or password")
    }
  }
)


const restaurantAuthSlice = createSlice ({
  name: "restaurantAuth",
  initialState,
  reducers:{
    logout: (state)=>{
      state.restaurant = null;
      state.token = null
      state.error = null 
      state.loading = false
      removeStorageItem("AuthToken")
    }
  },
  extraReducers: (builder) =>{
    builder
    .addCase(login.pending, (state)=>{
      state.loading = true
      state.error = null 
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addCase(login.fulfilled, (state, action: PayloadAction <any>)=>{
      state.loading = false
      state.restaurant = action.payload.restaurant
      state.token = action.payload.token
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addCase(login.rejected, (state, action: PayloadAction <any>)=>{
      state.loading = false
      state.error = action.payload
    })

  }
})


export const { logout } = restaurantAuthSlice.actions

export default restaurantAuthSlice.reducer;



