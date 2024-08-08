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
  filterOptions: string;
  sortOption: string;
}

const initialState: RestaurantsState = {
  searchQuery: '',
  restaurants: [],
  filteredRestaurants: [],
  isLoading: false,
  error: null,
  locationData: [],
  filterOptions: '',
  sortOption: '',
};

const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]/gi, '');


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


export const fetchLocationData = createAsyncThunk(
  'restaurants/fetchLocationData',
  async (query: string) => {
    try {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${
        import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN
      }`);
      const data = await res.json();
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
      const searchTerm = normalizeString(state.searchQuery)
      state.filteredRestaurants = state.restaurants.filter((restaurant) =>
        normalizeString(restaurant.restaurantName).includes(searchTerm)
      );
    },
    filterRestaurantsByLocation: (state, action: PayloadAction<number>) => {
      state.filteredRestaurants = state.restaurants.filter((restaurant) =>
        restaurant.location.coordinates[1] === action.payload
      );
    },
    setFilterOptions: (state, action: PayloadAction<string>) => {
      state.filterOptions = action.payload;
      switch (action.payload) {
        case 'lessThan200':
          state.filteredRestaurants = state.restaurants.filter((restaurant) => parseFloat(restaurant.TableRate) < 200);
          break;
        case '200To500':
          state.filteredRestaurants = state.restaurants.filter((restaurant) => parseFloat(restaurant.TableRate) >= 200 && parseFloat(restaurant.TableRate) <= 500);
          break;
        case 'above500':
          state.filteredRestaurants = state.restaurants.filter((restaurant) => parseFloat(restaurant.TableRate) > 500);
          break;
        default:
          state.filteredRestaurants = state.restaurants;
          break;
      }
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
      if (action.payload === 'sortByName') {
        state.filteredRestaurants.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
      }
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


export const { updateSearchQuery, filterRestaurants, filterRestaurantsByLocation, setFilterOptions, setSortOption } = restaurantsSlice.actions;


export const selectRestaurants = (state: RootState) => state.restaurantSearch.restaurants;
export const selectFilteredRestaurants = (state: RootState) => state.restaurantSearch.filteredRestaurants;

export default restaurantsSlice.reducer;

