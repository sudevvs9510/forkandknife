export interface UserType {
   username: string;
   email: string;
   phone: string;
   password: string;
}

export interface ErrorType {
   username?: string;
   email?: string;
   phone?: string;
   password?: string;
}


export interface userType {
   email: string,
   password: string,
}

export const validateLogin = (values: userType) => {
   const errors: ErrorType = {}
   if (!values.email) {
       errors.email = "Email is required"
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
       errors.email = "Please enter a valid email address";
   }
   if (!values.password) {
       errors.password = "Password is required"
   } else if (values.password.length < 6) {
       errors.password = "Password length must be 8 characters";
   }
   return errors
}


export const validateOtp = (values : {otp:string})=>{
   const errors: {[key: string]: string} ={};
   if(!values.otp){
      errors.otp = "Otp is required";
   } else  if(values.otp.length < 6){
      errors.otp = " otp must be 6 digits"
   }
   return errors
}

export const validateSignup = (values: UserType): ErrorType  => {
   const newErrors: ErrorType = {};

   if (!values.username) {
       newErrors.username = "Username is required";
   }
   if (!values.email) {
       newErrors.email = "Email is required";
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
       newErrors.email = "Please enter a valid email address";
   }
   if (!values.phone) {
       newErrors.phone = "Phone number is required";
   } else if (values.phone.length < 10) {
       newErrors.phone = "Phone number length must be 10";
   }
   if (!values.password) {
       newErrors.password = "Password is required";
   } else if (values.password.length < 6) {
       newErrors.password = "Password length must be at least 6 characters";
   }

   return newErrors 
};