import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // const currentUser  = true
    const currentUser  = useSelector((state)=>state.auth.user) 
  return currentUser ? <Outlet /> : <Navigate to='/'/>
}

export default PrivateRoute