
export interface UserType {
   username: string;
   email: string;
   phone: string;
   password: string;
}

// export interface ErrorType {
//    username?: string;
//    email?: string;
//    phone?: string;
//    password?: string;
//    role?: string
// }


export interface RestaurantType{
    restaurantName: string;
    email: string;
    contact: string;
    password: string;
    
}

export type ResetPasswordValues = {
    password: string;
    confirmPassword: string;
};

// user validation 

export const validateLogin = (values: Partial<UserType>) => {
   const errors: Partial<UserType>= {}
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

export const validateSignup = (values: Partial<UserType>) => {
   const newErrors: Partial<UserType> = {};

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



// Restaurant validation 

export const validateRestaurantSignup = (values: Partial<RestaurantType>) => {
    const newErrors: Partial<RestaurantType> = {};
 
    if (!values.restaurantName) {
        newErrors.restaurantName = "restaurant name is required";
    }
    if (!values.email) {
        newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        newErrors.email = "Please enter a valid email address";
    }
    if (!values.contact) {
        newErrors.contact = "Phone number is required";
    } else if (values.contact.length < 10) {
        newErrors.contact = "Phone number length must be 10";
    }
    if (!values.password) {
        newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
        newErrors.password = "Password length must be at least 6 characters";
    }
    return newErrors
 
 };
 export const validateResetPassword = (values: ResetPasswordValues) => {
    const errors: Partial<ResetPasswordValues> = {};

    if (!values.password) {
        errors.password = 'Please enter the password!';
    } else {
        if (values.password.length > 20) {
            errors.password = 'Please enter a password less than 20 characters';
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(values.password)) {
            errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!';
        }
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required!';
    } else {
        if (values.confirmPassword.length < 8) {
            errors.confirmPassword = 'Password must be 8 characters long!';
        }
        if (values.confirmPassword.length > 20) {
            errors.confirmPassword = 'Please enter a password less than 20 characters';
        }
        if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords must match';
        }
    }

    return errors;
};
