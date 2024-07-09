/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import authAxios from '../../api/authApi';

export interface RestaurantType {
  _id?: string;
  email: string;
  contact: string;
  restaurantName: string;
  address: string;
  place: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  description: string;
  closingTime: string;
  openingTime: string;
  TableRate: string;
  secondaryImages: string;
  featuredImage: string;
}

interface RestaurantsState {
  searchQuery: string;
  restaurants: RestaurantType[];
  filteredRestaurants: RestaurantType[];
  isLoading: boolean;
  error: string | null;
  locationData: any[];
}

const initialState: RestaurantsState = {
  searchQuery: '',
  restaurants: [],
  filteredRestaurants: [],
  isLoading: false,
  error: null,
  locationData: [],
};

// Async thunk to fetch restaurants from the API
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async () => {
    try {
      const response = await authAxios.get('/restaurants');
      return response.data.restaurant;
    } catch (error) {
      throw new Error('Failed to fetch restaurants');
    }
  }
);

// Async thunk to fetch location data from the Mapbox API
export const fetchLocationData = createAsyncThunk(
  'restaurants/fetchLocationData',
  async (query: string) => {
    try {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${
        import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN
      }`);
      const data = await res.json();
      console.log(data)
      return data.features;
    } catch (error) {
      console.log("Error in Get Location", error);
      throw error;
    }
  }
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    filterRestaurants: (state) => {
      const searchTerm = state.searchQuery.toLowerCase();
      state.filteredRestaurants = state.restaurants.filter((restaurant) =>
        restaurant.restaurantName.toLowerCase().includes(searchTerm)
      );
    },
    filterRestaurantsByLocation: (state, action: PayloadAction<number>) => {
      state.filteredRestaurants = state.restaurants.filter((restaurant) =>
        restaurant.location.coordinates[1] === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurants.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<RestaurantType[]>) => {
      state.isLoading = false;
      state.restaurants = action.payload;
      state.filteredRestaurants = action.payload;
    });
    builder.addCase(fetchRestaurants.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch restaurants';
    });
    builder.addCase(fetchLocationData.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.locationData = action.payload;
    });
  },
});

// Export action creators and reducer
export const { updateSearchQuery, filterRestaurants, filterRestaurantsByLocation } = restaurantsSlice.actions;

// Selectors
export const selectRestaurants = (state: RootState) => state.restaurantSearch.restaurants;
export const selectFilteredRestaurants = (state: RootState) => state.restaurantSearch.filteredRestaurants;

export default restaurantsSlice.reducer;
