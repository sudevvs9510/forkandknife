import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';
import { toast } from "react-toastify";
import { removeStorageItem } from "../../util/localStorage";
import { validateResetPassword, ResetPasswordValues } from '../../helpers/validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const NewPassword: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const formik = useFormik<ResetPasswordValues>({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: validateResetPassword,
        onSubmit: async (values) => {
            try {
                await authAxios.put(`/reset-password/${id}`, { password: values.password });
                toast.success("Successfully Updated");
                removeStorageItem("resetPass");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } catch (error) {
                toast.error("Failed to Update");
            }
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg shadow-gray-400 w-full max-w-md mx-auto p-8 rounded-lg">
                <form
                    className="flex flex-col gap-5"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="text-start pb-5">
                        <h1 className="text-2xl font-bold text-red-500">Reset Password</h1>
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="text-base font-bold text-[#00655B]">
                            New Password
                        </label>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 font-semibold text-sm">
                                {formik.errors.password}
                            </p>
                        )}
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="p-3 outline-none border rounded-lg border-neutral-700 text-sm w-full"
                            {...formik.getFieldProps("password")}
                        />
                        <div className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center text-sm leading-5">
                            <button
                                type="button"
                                className="focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash size={20} color='grey' /> : <FaEye size={20} color='grey' />}
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="confirmPassword" className="text-base font-bold text-[#00655B]">
                            Confirm Password
                        </label>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-red-500 font-semibold text-sm">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            className="p-3 outline-none border rounded-lg border-neutral-700 text-sm w-full"
                            {...formik.getFieldProps("confirmPassword")}
                        />
                        <div className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center text-sm leading-5">
                            <button
                                type="button"
                                className="focus:outline-none"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash size={20} color='grey' /> : <FaEye size={20} color='grey'/>}
                            </button>
                        </div>
                    </div>

                    <button className="w-full bg-[#00655B] p-3 rounded-xl text-white font-bold hover:bg-blue-500" type="submit">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewPassword;
