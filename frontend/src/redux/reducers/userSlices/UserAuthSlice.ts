/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, googleLogin, Register, logoutUser} from "../../../api/api"
import { setStorageItem, removeStorageItem } from "../../../util/localStorage";




interface userAuthState {
   email: any;
   username: any;
   user: any;
   token: string | null;
   error: string | null
   loading: boolean
}

const initialState: userAuthState = {
   user: null,
   token: null,
   error: null,
   loading: false
}

export const login = createAsyncThunk(
   'auth/login',
   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {

         const response = await loginUser(credentials)
         setStorageItem('AuthToken', response.data.token)
         return response.data
      } catch (error) {
         return rejectWithValue("Invalid email or password")
      }
   }
)


export const signup = createAsyncThunk(
   'auth/signup',
   async (credentials: { username: string; email: string; password: string; phone: string; role: string }, { rejectWithValue }) => {
      try {
         const response = await Register(credentials)
         setStorageItem("otpSession", response.user._id as string)
         setStorageItem('remainingSeconds', '30')
         setStorageItem("Email", response.user._id)
         return response.user
      } catch (error) {
         return rejectWithValue("Signup failed")
      }
   }
)


export const googleLoginAction = createAsyncThunk(
   'auth/googleLogin',
   async (credentials: { email: string; given_name: string; sub: string }, { rejectWithValue }) => {
      try {
         const response = await googleLogin(credentials)
         setStorageItem('AuthToken', response.data.token)
         return response.data
      } catch (error) {
         return rejectWithValue("Google login failed")
      }
   }
)


export const logout = createAsyncThunk(
   'auth/logout',
   async (_, { rejectWithValue }) => {
      try {
         await logoutUser(); 
         removeStorageItem('AuthToken'); 
         return true
      } catch (error) {
         return rejectWithValue("Failed to logout");
      }
   }
);

const authSlice = createSlice({
   name: 'userAuth',
   initialState,
   reducers: {

      // logout: (state) => {
      //    state.user = null
      //    state.token = null
      //    state.loading = false;
      //    state.error = null;
      //    removeStorageItem('AuthToken')
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
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null
         })
         .addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
         })


         .addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = action.payload;
         })
         .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
         })



         .addCase(googleLoginAction.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(googleLoginAction.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
         })
         .addCase(googleLoginAction.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
         })



         .addCase(logout.pending,(state) =>{
            state.loading = true
            state.error = null 
         })
         .addCase(logout.fulfilled,(state)=>{
            state.user = null
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




export default authSlice.reducer


