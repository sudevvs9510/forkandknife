import { Navigate } from "react-router-dom";
import  OtpVerify from '../../Components/user/OtpVerify'
import { getStorageItem } from '../../util/localStorage'

export const renderOTPComp = () =>{
   const otpSessionExists = getStorageItem("otpSession")
   return otpSessionExists ? <OtpVerify /> : <Navigate to="/signup" />
}