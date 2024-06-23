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
   otp:string;
}

export const Register = async (credentials: credentials): Promise<{ user: {email: string, _id: string}; message: string | null }> => {
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



export const verifyOtp = async (otp: OtpType, userId: string)=> {
   try {
      const { data: { message, success } } = await authAxios.post('/verify-otp', { otp, userId })
      console.log(message, success);
      return { data: { message,success } }
   } catch (error) {
      console.error(error)
      throw error
   }
}

export const resendOtp = async(userId : string)=>{
   try{
      const { data: {message, success}} = await authAxios.post('/resend-otp',{userId})
      console.log(message, success)
      return { data : { message, success }}
   } catch (error){
      console.log(error);
      throw error
   }
}



export const googleLogin = async (credentials: { email: string; given_name: string; sub: string}): Promise<APIresponse> => {
   try {
      const { data: { message, user, token } } = await authAxios.post('/google-login', credentials)
      return { data: { message, user, token } }
   } catch (err) {
      console.error(err);
      throw err

   }
}



export const adminLogin = async (data: Partial<credentials>): Promise<APIresponse> =>{
   try{
      const {data:{message, user, token}} =  await authAxios.post("/admin/login", data)
      return { data:{message, user, token }}
   } catch(error){
      console.error(error);
      throw error
      
   }  
}

export const Logout = async () =>{
   const response = await authAxios.post("/logout")
   if(response.status !==200){
      throw new Error("Logout Failed")
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

