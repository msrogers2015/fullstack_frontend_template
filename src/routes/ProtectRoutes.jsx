// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import privateApi from "../api/privateApi";

/**
 * Preforms a check on all endpoints to ensure token is valid and the user has access to the requested page.
 * @returns {React.JSX.Element}
 * @constructor
 */
function ProtectedRoutes() {
  const [validToken, setValidToken] = useState(null)
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);


  /**
   * If there is no token, set token validation to false and redirect user to login page. If a token
   * is present, the privateApi is used to verify if the token is still valid.
   */
  useEffect(() => {
    if (!token) { // No token found
      setValidToken(false);
      return;
    }
    privateApi.get('/auth/verify')
      .then(() => { // Token successfully verified on the backend
        setValidToken(true)
      })
      .catch(() => { // Token not verified on the backend.
        localStorage.removeItem(process.env.REACT_APP_TOKEN)
        setValidToken(false)
        }
      )
  }, [token]);


  /**
   * Display loading on the screen while validating the token
   */
  if (validToken === null) {return <>Loading...</>}


  /**
   * Redirect user to login page upon invalid token.
   */
  if (validToken === false) {return <Navigate to='/login' />}

  return <Outlet />
}

export default ProtectedRoutes;