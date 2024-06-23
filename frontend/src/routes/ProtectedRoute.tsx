import React from 'react'
import { RootState } from "../redux/app/store"
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  element : React.ReactElement;
}

const ProtectedRoute:React.FC<PrivateRouteProps> = ({element}) => {

  const token = useSelector((state: RootState)=>state.userAuth.token)
  return token ? element : <Navigate to="/login" />
}

export default ProtectedRoute;
