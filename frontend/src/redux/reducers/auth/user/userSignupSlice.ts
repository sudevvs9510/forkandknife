import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from '../../../api/authApi'
interface sendData {
   username:string;
   email:string;
   password:string;
   phone:string;
}
export interface signupResponse {
   message:string;
   id:string;
}
export const userSignup = createAsyncThunk<signupResponse,sendData>("user/signup", async(payloads,{rejectWithValue}) =>{
   try{
      const response = await authAxios.post('/signup', payloads)

      return response.data

   }catch(err){
      // throw new Error(err.response?.data?.message)
      rejectWithValue(<signupResponse>{
         message:'Internal Server Error',
         id:''
      })
   }
})

export interface initialInterface {
   loading:boolean;
   successMessage:string;
   error:string;
}

const initialState = <initialInterface>{
   loading: false,
   successMessage: '',
   error: ''
}

const userSignupSlice = createSlice({
   name:'user/signup',
   initialState,
   reducers:{
      resetSuccessMessage: (state) => {
         state.successMessage = '' 
      },
      resetSignupError: (state) => {
         state.error = '' 
      }
   },
   extraReducers: (builder) =>{
      builder
      .addCase(userSignup.pending,(state)=>{
         state.loading = true
         state.error = '' 
      })
      .addCase(userSignup.fulfilled, (state,action:PayloadAction<signupResponse>)=>{
         state.loading = false
         state.successMessage = action.payload?.message
      })
      .addCase(userSignup.rejected,(state,action)=>{
         state.loading = false
         state.error = action.error?.message || "Login failed"
      })
   }
})

export const {resetSuccessMessage, resetSignupError} = userSignupSlice.actions
export default userSignupSlice.reducer