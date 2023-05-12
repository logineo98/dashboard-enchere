import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '../../components';

const PrivateRoute = ({ auth, loading }) => {
    if (loading) return <Loading />
    else return auth ? <Outlet /> : <Navigate to="/" />

}
export default PrivateRoute