import React from 'react';
import { Navigate } from 'react-router-dom';
import AddChatPage from './AddChatPage.jsx';
import Chat from './Chat';
const ProtectedRoute = (props) => {
  const isAuthenticated = !!sessionStorage.getItem('user'); // Simple authentication check
  return isAuthenticated ? (
    <>
      <AddChatPage />
      {/* <Chat /> */}
    </>
  ) : (
    <Navigate to="/chatadmin" />
  );
};

export default ProtectedRoute;
