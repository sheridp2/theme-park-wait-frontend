import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import UserPage from '../User/UserPage';

const User = () => {
  const { user } = useContext(UserContext);
  return (
    <DashboardLayout activeMenu="User Page">
      <UserPage user={user} />
    </DashboardLayout>
  );
}

export default User
