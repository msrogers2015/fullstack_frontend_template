import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import publicApi from "../../api/publicApi";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData]  = useState({username: '', password: ''})
  const navigate = useNavigate()

  /**
   * Handles changes within the form and updates the login dictionary.
   * @param event
   */
  const handleChange = (event) => {
    let value = event.target.value
    let key = event.target.id
    setLoginData(prevState => ({...prevState, [key]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loginData.username && loginData.password) { // Login form is fully completed
      try {
        const res = await publicApi.post('/auth/login', loginData);
        const token = res.data.token;
        console.log(token)
        localStorage.setItem(process.env.REACT_APP_TOKEN, token)
        navigate('/dashboard')
      } catch (err) {
        alert(err.response.data.detail)
      }
    } else if (loginData.username && !loginData.password) { // Login is missing password
      alert('Please enter your password')
    } else if (!loginData.username && loginData.password) { // Login is missing username.
      alert('Please enter your username')
    } else { // Login isn't filled out.
      alert('Please enter your login details')
    }
  }

  return (
    <>
      <Form noValidate onSubmit={handleSubmit} >
        <Row>
          {/* Username */}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required type='text' id='username' onChange={handleChange} />
          </Form.Group>
          {/* Password */}
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' id='password' onChange={handleChange} />
          </Form.Group>
        </Row>
        {/* Submission Button */}
        <Row>
          <Button type='submit'>Login</Button>
        </Row>
      </Form>
    </>
  )
}

export default Login;