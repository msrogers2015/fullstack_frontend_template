import React, { useState, useEffect } from 'react';
import { getUserData } from "../../utils/Auth";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserProfile() {
  const user = getUserData()
  console.log(user)
  const [editUser, setEditUser] = useState(getUserData())
  const [editState, setEditState] = useState(true)
  const [validated, setValidated] = useState(false)

  const handleChange = (event) => {
    let value = event.target.value
    let key = event.target.id
    setEditUser(prevState => ({...prevState, [key]: value}))
    console.log(editUser)
  }

  /**
   * Set tab name.
   */
  useEffect(() => {
    document.title = 'User Profile'
  }, []);

  return (
    <Form noValidate validated={validated}>
      {/* Username */}
      <Row className='align-items-center'>
        <Col xs={12} sm={2} xl={1} className='text-center text-sm-start mt-2'>
          <Form.Label>Username</Form.Label>
        </Col>
        <Col xs={12} sm={10} xl={11}>
          <Form.Control
            id='username'
            name='username'
            type='text'
            plaintext={true}
            readOnly={true}
            value={user['username']}
            onChange={handleChange}
            className='text-center text-sm-start'
          />
        </Col>
      </Row>
      {/* Full Name */}
      <Row className='align-items-center'>
        <Col xs={12} sm={2} xl={1} className='text-center text-sm-start mt-2'>
          <Form.Label>Full Name</Form.Label>
        </Col>
        <Col xs={12} sm={10} xl={11}>
          <Form.Control
            id='full_name'
            name='full_name'
            type='text'
            plaintext={!editState}
            readOnly={!editState}
            value={editUser['full_name']}
            onChange={handleChange}
            className='text-center text-sm-start'
          />
        </Col>
      </Row>
      {/* Email */}
      <Row className='align-items-center'>
        <Col xs={12} sm={2} xl={1} className='text-center text-sm-start mt-2'>
          <Form.Label>Email</Form.Label>
        </Col>
        <Col xs={12} sm={10} xl={11}>
          <Form.Control
            id='email'
            name='email'
            type='email'
            plaintext={!editState}
            readOnly={!editState}
            value={editUser['email']}
            onChange={handleChange}
            className='text-center text-sm-start'
          />
        </Col>
      </Row>
    </Form>
  )
}

export default UserProfile;