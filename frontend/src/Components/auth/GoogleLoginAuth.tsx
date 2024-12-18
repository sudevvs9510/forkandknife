
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/app/store';
import { googleLoginAction } from '../../redux/reducers/userSlices/UserAuthSlice';

const GoogleLoginAuth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); 
  const { loading, error } = useSelector((state: RootState) => state.userAuth);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Fetch user info from Google
        const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`);
        if (!res.ok) throw new Error('Failed to fetch user data from Google');

        const userData = await res.json();

        // Dispatch Google Login Action
        const result = await dispatch(googleLoginAction({
          email: userData.email,
          given_name: userData.given_name,
          sub: userData.sub,
        }));

        // Navigate if login is successful
        if (googleLoginAction.fulfilled.match(result)) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
    },
  });

  return (
    <>
      <button
        type='submit'
        onClick={() => handleGoogleLogin()}
        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#008376] text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        disabled={loading}
      >
        <div className="bg-white p-2 rounded-full">
          <svg className="w-4" viewBox="0 0 533.5 544.3">
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
          </svg>
        </div>
        <span className="ml-4">
          Sign In with Google
        </span>
      </button>
      {loading && <p></p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default GoogleLoginAuth;
