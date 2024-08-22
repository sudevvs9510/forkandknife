/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTableDatas, addtableDatas, TableSlotTypes } from '../../../api/RestaurantApis';

interface RestaurantTablesState {
  tableDatas: TableSlotTypes[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantTablesState = {
  tableDatas: [],
  loading: false,
  error: null,
};

// Async thunk for fetching table data
export const fetchTableDatas = createAsyncThunk(
  'restaurantTables/fetchTableDatas',
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await getTableDatas(restaurantId);
      return response.data.tableSlotDatas;
    } catch (error) {
      return rejectWithValue('Error fetching table data');
    }
  }
);

// Async thunk for adding a new table
export const addTableData = createAsyncThunk(
  'restaurantTables/addTableData',
  async (values: TableSlotTypes, { rejectWithValue }) => {
    try {
      const response = await addtableDatas(values);
        console.log(response)
        return response;
    } catch (error : any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const restaurantTablesSlice = createSlice({
  name: 'restaurantTables',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableDatas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTableDatas.fulfilled, (state, action: PayloadAction<TableSlotTypes[]>) => {
        state.tableDatas = action.payload;
        state.loading = false;
      })
      .addCase(fetchTableDatas.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTableData.fulfilled, (state, action: PayloadAction<TableSlotTypes>) => {
        state.tableDatas.push(action.payload);
        state.loading = false;
      })
      .addCase(addTableData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = restaurantTablesSlice.actions;

export default restaurantTablesSlice.reducer;
