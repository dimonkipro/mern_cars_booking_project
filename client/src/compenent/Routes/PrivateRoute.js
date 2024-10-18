import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
    
    const checkToken=localStorage.getItem('token')

  return (
    <>
      {
        checkToken
          ? children // If the token exists, render the child component
          : (alert("You must be logged in to access this page!"),
            (<Navigate to="/" />)) // If no token, show alert and redirect
      }
    </>
  );
}

export default PrivateRoute