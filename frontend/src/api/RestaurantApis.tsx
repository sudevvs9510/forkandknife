/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { RestaurantValues } from "../helpers/validation";
import authAxios from "../redux/api/authApi";


export interface credentials {
  restaurantName: string;
  email: string;
  password: string
  contact: string;
  address: string;
  description: string;
  openingTime: string;
  closingTime: string;
  TableRate: string;
  featuredImage: string;
  secondaryImages: string;
}


export interface TableSlotTypes {
  _id?: string
  tableNumber: string;
  tableCapacity: number
  tableLocation: string
}

export interface TimeSlotTypes {
  _id?: string
  slotStartTime: string
  slotEndTime: string
}

export const RestaurantRegister = async (datas: credentials) => {
  try {
    console.log("Sending payload:", datas);
    const { data: { success, message } } = await authAxios.post("/restaurant/registration", datas);
    return { data: { success, message } };
  } catch (error) {
    console.log("Error in register", error)
    throw error;
  }
}



export const RestaurantLoginApi = async (data: Partial<credentials>) => {
  try {
    console.log(data);
    const response = await authAxios.post('/restaurant/login', data);
    const { message, restaurant, token } = response.data;
    console.log(response.data);
    return { message, restaurant, token };
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
};


export const RestaurantFullDetails = async (datas: RestaurantValues) => {
  try {
    console.log("response")
    const response = await authAxios.put("/restaurant/restaurant-updation", { datas });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadCloudImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hg75472a');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/sudev99/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false,
      }
    );
    console.log(response)

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


export const getTableDatas = async (restaurantId: string) => {
  try {
    const { data: { message, tableSlotDatas } } = await authAxios.get(`/restaurant/tables/${restaurantId}`)
    return { data: { message, tableSlotDatas } }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addtableDatas = async (tableAddingDatas: TableSlotTypes) => {
  try {
      const { data } = await authAxios.post("/restaurant/add-table", { tableAddingDatas });
      return data; 
  } catch (error) {
      console.log(error);
      throw error;
  }
}


export const deleteTableDatas = async (restaurantId: string, tableId: string) => {
  try {
    const response = await authAxios.post("/restaurant/delete-table", { restaurantId, tableId })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const getTableSlot = async (tableId: string) => {
  try {
    const { data: { tableSlotDatas, message } } = await authAxios.get(`restaurant/table-slots/${tableId}`)
    return { data: { tableSlotDatas, message } }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addTableSlot = async (tableSlotTimeData: { slotStartTime: string, slotEndTime: string, tableSlotDate: string }, tableId: string) => {
  try {
    const response = await authAxios.post("restaurant/add-table-slot", { tableSlotTimeData, tableId });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTableSlot = async (tableId: string, tableSlotId: string) => {
  try {
    const response = await authAxios.post("restaurant/delete-table-slot", { tableId, tableSlotId })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const getTimeSlot = async () => {
  try {
    const { data: { message, timeSlotDatas } } = await authAxios.get(`/restaurant/time-slots`)
    console.log(timeSlotDatas)
    return { data: { message, timeSlotDatas } }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addTimeSlot = async (slotAddingDatas: TimeSlotTypes) => {
  try {
    console.log("Sending data to server:", slotAddingDatas);
    const response = await authAxios.post("restaurant/add-time-slot", slotAddingDatas)
    console.log("Server response:", response.data);
    return response.data
  } catch (error: any) {
    console.error("Error in addTimeSlot:", error);
    if (error.response) {
      console.error("Server error response:", error.response.data);
      return error.response.data;
    }
    throw error;
  }
}

export const deleteTimeSlot = async (timeSlotId: string, restaurantId: string) => {
  try {
    const { data } = await authAxios.post("restaurant/delete-time-slot", { timeSlotId, restaurantId })
    console.log(timeSlotId, restaurantId)
    return { data }

  } catch (error) {
    console.log(error)
    throw error
  }
}


export const getUserDetails = async (userId: string) => {
  try {
    const response = await authAxios.get(`/restaurant/user-details/${userId}`)
    console.log(response)
    return response.data.userDetails
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const getReservationDetails = async (bookingId: string) => {
  try {
    const response = await authAxios.get(`/restaurant/reservation-details/${bookingId}`)
    console.log(response.data)
    return response.data.reservationDatas
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const updateBookingStatus = async (bookingId: string, bookingStatus: string) => {
  try {
    const response = await authAxios.patch(`/restaurant/booking-status-edit/${bookingId}`,{ bookingStatus })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const logoutRestaurant = async () => {
  try {
    console.log("llkk")
    await authAxios.post('/restaurant/logout')

  } catch (error) {
    console.log("Logout error", error)
  } finally {
    localStorage.removeItem("AuthToken")
  }
}