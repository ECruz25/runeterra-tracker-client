import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { getUrl } from '../utils/restClient'

export default () => {
  const createUser = async ({ target }) => {
    const [name, email, username, password] = target;
    const requestObject = {
      name,
      email,
      username,
      password
    }
    const response = await fetch(`${getUrl()}/account`, {
      method: 'POST',
      body: requestObject,
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
  }
  return <div style={{
    margin: "125px 500px"
  }}>
    <Form onSubmit={createUser}>
      <Form.Group controlId="name">
        <Form.Label>Full Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter your name" />
      </Form.Group>
      <Form.Group controlId="emailaddress">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="loruser">
        <Form.Label>LOR Username</Form.Label>
        <Form.Control required type="text" placeholder="Enter your LOR username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" autoComplete="off" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  </div>
};
