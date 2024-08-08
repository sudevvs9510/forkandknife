import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReservationDetails {
  selectedTable: {
    _id: string;
    tableNumber: string;
    tableCapacity: number;
    tableLocation: string;
  } | null;
  slotStartTime: string | null;
  slotEndTime: string | null;
  tableSlotId: string,
  restaurantName: string;
  guests: number;
  tableRate: string;
  restaurantId: string;
  bookingDate: string
}

const initialState: ReservationDetails = {
  selectedTable: null,
  slotStartTime: null,
  slotEndTime: null,
  restaurantName: '',
  guests: 0,
  tableRate: '',
  restaurantId: '',
  tableSlotId: '',
  bookingDate: ''

};

const bookingConfirmationSlice = createSlice({
  name: 'bookingConfirmation',
  initialState,
  reducers: {
    setReservationDetails(state, action: PayloadAction<ReservationDetails>) {
      state.selectedTable = action.payload.selectedTable;
      state.slotStartTime = action.payload.slotStartTime;
      state.slotEndTime = action.payload.slotEndTime;
      state.restaurantName = action.payload.restaurantName;
      state.guests = action.payload.guests;
      state.tableRate = action.payload.tableRate;
      state.restaurantId = action.payload.restaurantId;
      state.tableSlotId = action.payload.tableSlotId;
      state.bookingDate = action.payload.bookingDate
    },
  },
});

export const { setReservationDetails } = bookingConfirmationSlice.actions;
export default bookingConfirmationSlice.reducer;
