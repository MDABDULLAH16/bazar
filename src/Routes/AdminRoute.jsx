import React from 'react';
import useLoggedUser from '../hooks/useLoggedUser';
import { useNavigate } from 'react-router';

const AdminRoute = ({children}) => {
    const { loggedUser } = useLoggedUser();
    console.log({ loggedUser });
    const navigate = useNavigate()
    
   if (loggedUser?.role==='admin'||'super-admin') {
    return children
   } else {
       navigate('/')
   }
   
};

export default AdminRoute;