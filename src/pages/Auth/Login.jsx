import React, { useEffect, useState } from 'react';
import publicApi from "../../api/publicApi";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData]  = useState({username: '', password: ''})
  const navigate = useNavigate()


  /**
   * Redirect user to the dashboard if a token is present. The redirect will automatically handle validating
   * the token to ensure it hasn't expired.
   */
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN) !== null) {
      navigate('/dashboard')
    }
  }, []);


  /**
   * Handles changes within the form and updates the login dictionary.
   * @param event
   */
  const handleChange = (event) => {
    let value = event.target.value
    let key = event.target.id
    setLoginData(prevState => ({...prevState, [key]: value}))
  }

  /**
   * Checks form inputs to ensure required data is present before sending to the backend. If both the username
   * and password is present, the backend validates the login and either sends back a token or an error message.
   * @param event
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    if (loginData.username && loginData.password) { // Login form is fully completed
      publicApi.post('/auth/login', loginData)
        .then(res => { // Login is accepted
          const token = res.data.token
          localStorage.setItem(process.env.REACT_APP_TOKEN, token);
          navigate('/dashboard')
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