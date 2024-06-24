import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/app/store';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const RestaurantProtectedRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = useSelector((state: RootState) => state.restaurantAuth.token);
  return token ? element : <Navigate to="/restaurant/login" />;
};

export default RestaurantProtectedRoute;
