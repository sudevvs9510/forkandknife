import React, { useState } from 'react';
import authAxios from '../../redux/api/authApi';
import { useFormik } from 'formik';
import { setStorageItem } from '../../util/localStorage';

interface ErrorResponse {
    response: {
        data: {
            message: string;
        };
    };
}

const EmailForgotPassword: React.FC = () => {
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: { email?: string } = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const res = await authAxios.post('/reset-password', { email: values.email });
                setStorageItem("resetPass", "true");
                setEmailMessage(res.data.message);
                setError('');
                setIsEmailSent(true);
            } catch (err) {
                const error = err as ErrorResponse;
                setEmailMessage('');
                console.log(error.response.data.message);
                setError(error.response.data.message);
            }
        }
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-2xl shadow-slate-400 w-full max-w-md md:w-[400px] h-auto flex flex-col gap-6 justify-center items-center p-6 md:p-8 rounded-lg">
                <h1 className="text-red-500 font-bold text-2xl mb-2">Reset your password</h1>
                <p className="text-neutral-600 font-semibold text-sm">Please enter your registered email.</p>
                <form onSubmit={formik.handleSubmit} className="w-full">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            id="floating_email"
                            className={`block py-2 h-14 px-3 rounded-xl w-full text-sm ${
                                formik.errors.email && formik.touched.email ? 'text-red-500 border-red-400' : 'text-gray-900 border-gray-600'
                            } bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                            placeholder=" "
                            {...formik.getFieldProps('email')}
                            disabled={isEmailSent}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <p className="text-red-500 font-semibold text-sm mb-2 flex justify-center">{formik.errors.email}</p>
                        ) : (
                            emailMessage && <p className="text-green-500 font-semibold text-sm flex justify-center">{emailMessage}</p>
                        )}
                        {error && !emailMessage && (
                            <p className="text-red-500 font-semibold text-sm mb-2 flex justify-center">{error}</p>
                        )}
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 px-4 scale-75 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
                        >
                            Email address
                        </label>
                    </div>
                    <button
                        className={`w-full p-3 text-white font-bold text-base rounded-3xl ${isEmailSent ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                        type="submit"
                        disabled={isEmailSent}
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailForgotPassword;
