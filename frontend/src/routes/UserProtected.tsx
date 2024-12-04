// import React from 'react'
// import { RootState } from "../redux/app/store"
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';


// interface PrivateRouteProps {
//   element : React.ReactElement;
// }

// const ProtectedRoute:React.FC<PrivateRouteProps> = ({element}) => {

//   const token = useSelector((state: RootState)=>state.userAuth.token)
//   return token ? element : <Navigate to="/login" />
// }

// export default ProtectedRoute;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { RootState } from '../redux/app/store';
// import {jwtDecode} from 'jwt-decode';

// interface PrivateRouteProps {
//   element: React.ReactElement;
//   allowedRoles: string[];
// }
// interface JwtPayload {
//   userId: string;
//   role: string;
//   iat: number; // Issued at (UNIX timestamp)
//   exp: number; // Expiry (UNIX timestamp)
// }



// const UserProtected: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
//   const token = useSelector((state: RootState) => state.userAuth.token);


//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   const decodedToken = jwtDecode(token) as JwtPayload;
//   const  role  = decodedToken.role

//   return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
// };

// export default UserProtected;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { RootState } from '../redux/app/store';

interface PrivateRouteProps {
  element: React.ReactElement;
  allowedRoles: string[];
}

interface JwtPayload {
  userId: string;
  role: string;
  iat: number; // Issued at (UNIX timestamp)
  exp: number; // Expiry (UNIX timestamp)
}

const UserProtected: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
  const token = useSelector((state: RootState) => state.userAuth.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  let decodedToken: JwtPayload;
  try {
    decodedToken = jwtDecode(token) as JwtPayload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return <Navigate to="/login" />;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decodedToken.exp < currentTimestamp) {
    console.warn('Token expired');
    return <Navigate to="/login" />;
  }

  const { role } = decodedToken;

  return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
};

export default UserProtected;


