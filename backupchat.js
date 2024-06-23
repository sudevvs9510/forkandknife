// authSlice.ts 

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, Register, googleLogin } from '../../api/api';
import { setStorageItem, removeStorageItem } from '../../util/localStorage';

interface AuthState {
  user: any;
  token: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      setStorageItem('accessToken', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue('Invalid email or password');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: { username: string; email: string; password: string; phone: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await Register(credentials);
      setStorageItem('otpSession', response.user._id as string);
      setStorageItem('remainingSeconds', '30');
      setStorageItem('Email', response.user._id);
      return response.user;
    } catch (error) {
      return rejectWithValue('Signup failed');
    }
  }
);

export const googleLoginAction = createAsyncThunk(
  'auth/googleLogin',
  async (credentials: { email: string; given_name: string; sub: string }, { rejectWithValue }) => {
    try {
      const response = await googleLogin(credentials);
      setStorageItem('jwtToken', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue('Google login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeStorageItem('accessToken');
    },
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


//store.ts

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



//LoginForm.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login } from '../../redux/slices/authSlice';
import { validateLogin } from '../../helpers/validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleLoginAuth from './GoogleLoginAuth';
import background from '../../assets/images/pexels-photo-776538.webp';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateLogin,
        onSubmit: async (credentials) => {
            const resultAction = await dispatch(login(credentials));
            if (login.fulfilled.match(resultAction)) {
                navigate('/home');
            }
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen bg-gray-100 overflow-hidden text-gray-900 flex justify-center">
            <div className="w-full bg-white shadow sm:rounded-lg flex h-full justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <h2 className="flex flex-col items-center text-green-600 font-bold text-2xl">Fork & Knife</h2>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <p className="text-2xl font-bold mb-3 text-[#00655B]">Login</p>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <form onSubmit={formik.handleSubmit}>
                                    {error && <div className="text-red-500 mb-4">{error}</div>}
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="text-red-500">{formik.errors.email}</div>
                                    )}
                                    <div className="relative mt-5">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            placeholder="Password"
                                            {...formik.getFieldProps('password')}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
                                        </button>
                                    </div>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-red-500">{formik.errors.password}</div>
                                    )}
                                    <p className="ml-auto text-sm cursor-pointer mt-3 underline">
                                        <Link to="/reset-password">Forgot password?</Link>
                                    </p>
                                    <button
                                        type="submit"
                                        className="mt-5 tracking-wide font-semibold bg-[#00655B] text-gray-100 w-full py-4 rounded-lg hover:bg-[#00897B] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        {loading ? 'Loading...' : 'Login'}
                                    </button>
                                </form>
                                <GoogleLoginAuth />
                                <p className="mt-3 text-center text-gray-500 text-md">
                                    Don&apos;t have an account?{' '}
                                    <Link to="/signup">
                                        <span className="text-[#00655B]">Sign up</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 rounded-r-lg" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
            </div>
        </div>
    );
};

export default LoginForm;


// index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


// hooks.ts 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

