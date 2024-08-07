import authAxios from "../redux/api/authApi";
import { UserType } from "../helpers/validation"

interface credentials {
   username: string;
   email: string;
   phone: string;
   password: string;
   // role: string
}

// interface otpResponse {
//    data: {
//       message?: string,
//       user?: UserType,
//       token?: string,
//       refreshToken?: string
//    }
// }

export interface APIresponse {
   data: {
      message?: string,
      user: UserType,
      token: string,
      refreshToken?: string,
      // otp?: string
   },
}

export interface OtpType {
   otp: string;
}


interface ReviewData {
   username: string;
   description: string;
   rating: number;
   userId: string;
 }



export const Register = async (credentials: credentials): Promise<{ user: { email: string, _id: string }; message: string | null }> => {
   try {
      const response = await authAxios.post('/signup', credentials);
      const { user, message } = response.data;
      return { user, message };
   } catch (error) {
      console.log("Error in register", error)
      throw new Error()
   }
}



// export const loginUser = async (data: Partial<credentials>): Promise<APIresponse> => {
//    try {
//       console.log(data)
//       const { data: { token, message, user } } = await authAxios.post('/login', data);

//       return { data: { token, message, user } }

//    } catch (error) {
//       console.log(error)
//       throw error
//    }
// }

export const loginUser = async (data: Partial<credentials>): Promise<APIresponse> => {
   try {
      console.log(data);
      const response = await authAxios.post('/login', data);
      const { token, message, user } = response.data;
      console.log(response.data);
      return { data: { token, message, user } };
   } catch (error) {
      console.error(error);
      throw error;
   }
}



export const verifyOtp = async (otp: OtpType, userId: string) => {
   try {
      const { data: { message, success } } = await authAxios.post('/verify-otp', { otp, userId })
      console.log(message, success);
      return { data: { message, success } }
   } catch (error) {
      console.error(error)
      throw error
   }
}

export const resendOtp = async (userId: string) => {
   try {
      const { data: { message, success } } = await authAxios.post('/resend-otp', { userId })
      console.log(message, success)
      return { data: { message, success } }
   } catch (error) {
      console.log(error);
      throw error
   }
}



export const googleLogin = async (credentials: { email: string; given_name: string; sub: string }): Promise<APIresponse> => {
   try {
      const { data: { message, user, token } } = await authAxios.post('/google-login', credentials)
      return { data: { message, user, token } }
   } catch (err) {
      console.error(err);
      throw err

   }
}



export const adminLogin = async (data: Partial<credentials>): Promise<APIresponse> => {
   try {
      const { data: { message, user, token } } = await authAxios.post("/admin/login", data)
      return { data: { message, user, token } }
   } catch (error) {
      console.error(error);
      throw error

   }
}

export const logoutUser = async () => {
   try {
      await authAxios.post("/logout")
   } catch (error) {
      console.error("Logout error", error);
   } finally {
      localStorage.removeItem("AuthToken")

   }

}

export const validateToken = async () => {
   const response = await authAxios.get("/validate-token");
   console.log(response.data);
   if (response.status !== 200) {
      throw new Error("Token invalid");
   }
   return response;
};

export const fetchUserProfile = async (userId: string) => {
   try {
      const response = await authAxios.get(`/user-profile/${userId}`)
      console.log(response.data)
      return response.data.userData
   } catch (error) {
      console.error("Failed to fetch user profile:", error);
      throw error
   }
}


export const updateUserDetails = async (userId: string, userData: { username: string, phone: string }) => {
   try {
      const response = await authAxios.put(`/update-userDetails/${userId}`, userData)
      console.log("API update response:", response.data);
      return response.data
   } catch (error) {
      console.error("Failed to update user details:", error);
      throw error
   }
}

export const getRestaurantTableSlot = async (restaurantId: string | undefined, date: string, selectedGuests: number) => {
   try {
      const { data: { timeSlots } } = await authAxios.post("/restaurant-table-slots", { restaurantId, date, selectedGuests });
      console.log(timeSlots);
      return { timeSlots };
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const getBookingHistory = async (userId: string) => {
   try {
      const response = await authAxios.get(`/booking-history/${userId}`)
      console.log(response.data)
      return response.data.bookingDatas
   } catch (error) {
      console.log(error)
      throw error
   }
}


export const addReview = async (restaurantId: string, reviewData: ReviewData) => {
  try {
    const response = await authAxios.post(`/add-review/${restaurantId}`, reviewData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const fetchRestaurantReviews = async (restaurantId: string) =>{
   try{
      const response = await authAxios.get(`/get-reviews/${restaurantId}`)
      console.log(response.data.reviewDatas)
      return response.data.reviewDatas
   } catch(error){
      console.log(error)
      throw error
   }
}


