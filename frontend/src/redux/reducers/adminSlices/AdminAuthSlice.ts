/* eslint-disable @typescript-eslint/no-explicit-any */


import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"; 
import { setStorageItem, removeStorageItem } from "../../../util/localStorage";
import authAxios from "../../api/authApi";
import { logoutAdmin } from "../../../api/AdminApis";
import { PURGE } from "redux-persist";

interface adminAuthState{
   admin:any;
   token: string | null
   error: string | null
   loading: boolean 
}

const initialState: adminAuthState = {
  admin: null,
  token: null,
  error: null,
  loading: false 
}


export const adminLogin = createAsyncThunk (
  "adminAuth/adminLogin",
  async(credentials: { email: string; password:string},{ rejectWithValue }) =>{
    try{
      const response = await authAxios.post('/admin/login', credentials)
      const token = response.data.token
      setStorageItem('AdminAuthToken',token)
      return token
    } catch(error){
      return rejectWithValue('Invalid email or password')
    }
  }
)

export const logout = createAsyncThunk(
  "adminAuth/logout",
  async (_, { rejectWithValue, dispatch }) => {
     try {
       console.log("logoutauthtokenadmin")
        await logoutAdmin(); 
        removeStorageItem('AdminAuthToken'); 
        dispatch({ type: PURGE, result: () => null })
        return true
     } catch (error) {
        return rejectWithValue("Failed to logout");
     }
  }
);





const adminAuthSlice = createSlice({
  name:'adminAuth',
  initialState,
  reducers:{
    // adminLogout(state){
    //   state.token = null
    //   removeStorageItem('AuthToken')
    // }
  },
  extraReducers: (builder) =>{
    builder.addCase(adminLogin.pending, (state)=>{
      state.loading = true
      state.error = null 
    })
    .addCase(adminLogin.fulfilled,(state, action: PayloadAction<string>) =>{
      state.token = action.payload
      state.loading = false 
    })
    .addCase(adminLogin.rejected, (state, action)=>{
      state.loading = false
      state.error = action.payload as string 
    })

    .addCase(logout.pending,(state) =>{
      state.loading = true
      state.error = null 
   })
   .addCase(logout.fulfilled,(state)=>{
      state.admin = null
      state.token = null
      state.loading = false
      state.error = null 
   })
   .addCase(logout.rejected,(state,action: PayloadAction<any>)=>{
      state.loading = false
      state.error = action.payload
   })
  }
})


export default adminAuthSlice.reducer;

