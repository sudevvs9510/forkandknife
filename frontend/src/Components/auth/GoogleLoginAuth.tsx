import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../api/api';
import { setStorageItem } from '../../util/localStorage';


// interface GoogleLoginresponse {
//    name: string;
//    givenName: string;
//    email: string;
//    picture: string
// }


const GoogleLoginAuth :React.FC = () => {
const navigate = useNavigate()

// const handleGoogleLogin = useGoogleLogin({
//    onSuccess: async (response) => {
//       try {
//          const res = await authAxios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)
//          const userData = res.data;

//          const backendData = await googleLogin({
//             email: userData.email,
//             given_name: userData.given_name,
//             sub: userData.sub
//          })
//             console.log(backendData)
//              // Store JWT token in local storage
//       if (backendData.data.token) {
//          setStorageItem('jwtToken', backendData.data.token);
//       } else {
//         console.log('No token received');
//       }
            
//          navigate('/home')
//       } catch (error  ) {
         
//          console.log(error + 'kkkkkkkkk');
//       }
//    },
// })

const handleGoogleLogin = useGoogleLogin({
   onSuccess: async (response) => {
      try {
         const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`);
         if (!res.ok) {
            throw new Error('Failed to fetch user data from Google');
         }
         const userData = await res.json();

         const backendData = await googleLogin({
            email: userData.email,
            given_name: userData.given_name,
            sub: userData.sub
         });
         console.log(backendData);

         // Store JWT token in local storage
         if (backendData.data.token) {
            setStorageItem('jwtToken', backendData.data.token);
         } else {
            console.log('No token received');
         }
            
         navigate('/home');
      } catch (error) {
         console.error('Error during Google login:', error);
      }
   }
});



return (
      <>
         <button
         type='submit'
            onClick={()=>handleGoogleLogin()} className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#008376] text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
            <div className="bg-white p-2 rounded-full">
               <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                     d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                     fill="#4285f4" />
                  <path
                     d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                     fill="#34a853" />
                  <path
                     d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                     fill="#fbbc04" />
                  <path
                     d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                     fill="#ea4335" />
               </svg>
            </div>
            <span className="ml-4">
               Sign In with Google
            </span>
         </button>
         {/* <GoogleLogin onSuccess={(values)=>console.log("google login",values)} onError={()=>console.log("error")} /> */}
      </>
   )
}

export default GoogleLoginAuth






