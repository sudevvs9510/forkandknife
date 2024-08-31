import { FormikErrors } from "formik";
import { credentials } from "../api/RestaurantApis";
// import Secondaryimages from "../layouts/Secondaryimage";


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


export const restaurantLoginValidate = (values: Partial<credentials>) => {
  const errors: Partial<credentials>= {}
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



export interface RestaurantValues {
  restaurantName: string;
  email: string;
  restaurantType: "Veg & Non-Veg" | "Veg" | "Non-Veg",
  contact: string;
  address: string;
  location: {
    type: string;
    coordinates: [string, string];
  };
  place: string,
  description: string;
  closingTime: string;
  openingTime: string;
  TableRate: string;
  secondaryImages: (File | string)[];
  featuredImage: string | File;
}


// export const sellerRegistrationValidation = (values: RestaurantValues) => {

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const errors: any = {};

//   const isValidImageUrl = (url: string): boolean => {
//     return /\.(jpg|jpeg|png)$/i.test(url);
//   };

//   if (!values.restaurantName) {
//     errors.restaurantName = "Restaurant name is required!";
//   }
//   if (!values.email) {
//     errors.email = "Email is required!";
//   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//     errors.email = "Invalid Email Format";
//   }
//   if (!values.contact) {
//     errors.contact = "Contact is required!";
//   } else if (values.contact.length !== 10) {
//     errors.contact = "Contact must be 10 digits";
//   }
//   if (!values.address) {
//     errors.address = "Address is required!";
//   }
//   if (!values.description) {
//     errors.description = "Description is required!";
//   }
//   if (!values.location.type) {
//     errors.location = { types: "Location type is required!" };
//   }
//   if (!values.location.coordinates[0] || !values.location.coordinates[1]) {
//     errors.location = { ...errors.location, coordinates: "Location coordinates are required!" };
//   }
//   if (!values.openingTime) {
//     errors.openingTime = "Opening time is required!";
//   }
//   if (!values.closingTime) {
//     errors.closingTime = "Closing time is required!";
//   }
//   if (!values.TableRate) {
//     errors.TableRate = "Table rate is required!";
//   } else if (isNaN(Number(values.TableRate)) || Number(values.TableRate) < 1 || Number(values.TableRate) > 1000) {
//     errors.TableRate = "Table rate must be between 1 and 1000";
//   }

//   // Validate featuredImage
//   if (!values.featuredImage) {
//     errors.featuredImage = "Featured image is required!";
//   } else if (typeof values.featuredImage === 'string' && !isValidImageUrl(values.featuredImage)) {
//     errors.featuredImage = "Invalid image URL for featured image!";
//   }

//   // Validate secondaryImages
//   if (!values.secondaryImages || values.secondaryImages.length === 0) {
//     errors.secondaryImages = "Secondary images are required!";
//   } else if (!values.secondaryImages.every(image => typeof image === 'string' ? isValidImageUrl(image) : true)) {
//     errors.secondaryImages = "Invalid image URL in secondary images!";
//   }

//   return errors;
// };


export const sellerRegistrationValidation = (values: RestaurantValues) => {
  const errors: Partial<FormikErrors<RestaurantValues>> = {};

  const isValidImageUrl = (url: string): boolean => {
    return /\.(jpg|jpeg|png)$/i.test(url);
  };

  if (!values.restaurantName) {
    errors.restaurantName = "Restaurant name is required!";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid Email Format";
  }
  if (!values.contact) {
    errors.contact = "Contact is required!";
  } else if (values.contact.length !== 10) {
    errors.contact = "Contact must be 10 digits";
  }
  if (!values.address) {
    errors.address = "Address is required!";
  }
  if (!values.description) {
    errors.description = "Description is required!";
  }
  if (!values.location.type) {
    errors.location = { type: "Location type is required!" };
  }
  if (!values.location.coordinates[0] || !values.location.coordinates[1]) {
    errors.location = {
      ...errors.location,
      coordinates: "Location coordinates are required!"
    };
  }
  if (!values.openingTime) {
    errors.openingTime = "Opening time is required!";
  }
  if (!values.closingTime) {
    errors.closingTime = "Closing time is required!";
  }
  if (!values.TableRate) {
    errors.TableRate = "Table rate is required!";
  } else if (
    isNaN(Number(values.TableRate)) ||
    Number(values.TableRate) < 1 ||
    Number(values.TableRate) > 1000
  ) {
    errors.TableRate = "Table rate must be between 1 and 1000";
  }

  // Validate featuredImage
  if (!values.featuredImage) {
    console.log(values.featuredImage)
    errors.featuredImage = "Featured image is required!";
  } else if (
    !(values.featuredImage instanceof File) &&
    !isValidImageUrl(values.featuredImage)
  ) {
    errors.featuredImage = "Invalid image URL for featured image!";
  }

  // Validate secondaryImages
  if (!values.secondaryImages || values.secondaryImages.length === 0) {
    console.log(values.secondaryImages)
    errors.secondaryImages = "Secondary images are required!";
  } else if (
    !values.secondaryImages.every(
      image => image instanceof File || isValidImageUrl(image)
    )
  ) {
    errors.secondaryImages = "Invalid image URL in secondary images!";
  }

  return errors;
};
