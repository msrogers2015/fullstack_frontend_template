import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import publicApi from "../../api/publicApi";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function Login() {
  const [loginData, setLoginData]  = useState({username: '', password: ''})

  /**
   * Handles changes within the form and updates the login dictionary.
   * @param event
   */
  const handleChange = (event) => {
    let value = event.target.value
    let key = event.target.id
    setLoginData(prevState => ({...prevState, [key]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (loginData.username && loginData.password) { // Login form is fully completed
      publicApi.post('/auth/login', loginData)
        .then(res => { // Login is accepted
          const token = res.data.token
          sessionStorage.setItem(process.env.REACT_APP_TOKEN, token);
          sessionStorage.setItem(process.env.REACT_APP_DECODED_TOKEN, JSON.stringify(jwtDecode(token)));
          console.log('Login successful.')
        })
        .catch(err => { // Login is rejected
          alert(err.response.data.detail)
        })
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