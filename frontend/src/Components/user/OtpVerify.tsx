
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import OtpInput from 'react-otp-input'
import { getStorageItem } from "../../util/localStorage"
import { validateOtp } from "../../helpers/validation"
import { OtpType, verifyOtp } from '../../api/api';
import OtpTimer from './OtpTimer';
import { AxiosError } from 'axios';

const OtpVerify: React.FC = () => {
   const [error, setOtpError] = useState<string>("")
   const navigate = useNavigate();

   const formik = useFormik({
      initialValues: {
         otp: "",
      },
      validate: validateOtp,
      onSubmit: async (otp: OtpType) => {
         try {
            const userId = getStorageItem("Email")
            if (userId) {
               const { data } = await verifyOtp(otp, userId as string)
               console.log(data);
               navigate("/login")
            } else {
               setOtpError("User ID not found. please try again.")
            }

         } catch (err) {
            let errorMessage = "An error occurred. Please try again later.";
            if (err instanceof AxiosError && err.response?.data?.message) {
               errorMessage = err.response.data.message;
            }
            setOtpError(errorMessage);
         }
      }
   })

   const handleOtpChange = (otp: string) => {
      formik.setFieldValue("otp", otp)
      console.log(otp)
   }




   return (
      <>
         <div className="h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
               <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
               <div className="mb-4 flex justify-center">
                  <div className="p-8 pt-10">
                     <form onSubmit={formik.handleSubmit}>
                        <div className="pb-5">
                           <p className="text-[#008376] text-lg pb-3">Enter your OTP</p>
                           {error && <div className="text-red-500">{error}</div>}
                           <OtpInput
                              value={formik.values.otp}
                              onChange={handleOtpChange}
                              numInputs={6}
                              inputType='number'
                              renderInput={((props) => <input {...props}
                                 style={{
                                    width: '50px',
                                    height: '50px',
                                    fontSize: '1.5rem',
                                    textAlign: 'center',
                                    marginRight: '13px',
                                    border: '1px solid #008376',
                                    borderRadius: '8px',
                                    borderColor: "green",
                                    boxSizing: 'border-box',
                                 }}

                              />)}
                           />
                           {formik.touched.otp && formik.errors.otp && (
                              <div className="text-red-500 mt-3 text-center">{formik.errors.otp}</div>
                           )}
                           <OtpTimer />

                        </div>

                        <button
                           className=" rounded text-white shadow-gray-500 bg-[#008376] px-3 py-3 w-full"
                           type="submit"
                        >
                           Submit
                        </button>
                     </form>
                  </div>
               </div>
            </div >
         </div>
      </>
   );
};

export default OtpVerify
