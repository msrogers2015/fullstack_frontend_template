// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import privateApi from "../api/privateApi";
import {Nav} from "react-bootstrap";

function ProtectedRoutes() {
  const [validToken, setValidToken] = useState(null)
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
  console.log(`Initital Token ${token}`)

  useEffect(() => {
    if (!token) {
      setValidToken(false);
      return;
    }
    privateApi.get('/auth/verify')
      .then(res => {
        setValidToken(true)
      })
      .catch(err => {
        localStorage.removeItem(process.env.REACT_APP_TOKEN)
        setValidToken(false)
        }
      )
  }, [token]);

  if (validToken === null) {return <>Loading...</>}

  if (validToken === false) {return <Navigate to='/login' />}

  return <Outlet />
}

export default ProtectedRoutes;