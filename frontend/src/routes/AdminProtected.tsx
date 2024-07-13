
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/app/store';
import {jwtDecode} from 'jwt-decode';

interface PrivateRouteProps {
  element: React.ReactElement;
  allowedRoles: string[];
}
interface JwtPayload {
  userId: string;
  role: string;
  iat: number; 
  exp: number; 
}

const RestaurantProtected: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
  const token = useSelector((state: RootState) => state.adminAuth.token);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  const decodedToken = jwtDecode(token) as JwtPayload;
  const  role  = decodedToken.role

  return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
};

export default RestaurantProtected;



