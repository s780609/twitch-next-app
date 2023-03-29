import React, { useState, useEffect } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import axios from "axios";

function MailBox({ style }) {
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  const emailOnChange = (e) => {
    if (typeof e === "object") {
      const changedEmail = e.target.value;
      setEmail(changedEmail);
    }
  };

  const subjectOnChange = (e) => {
    if (typeof e === "object") {
      const changedSubject = e.target.value;
      setSubject(changedSubject);
    }
  };

  const messageOnChange = (e) => {
    if (typeof e === "object") {
      const changedMessage = e.target.value;
      setMessage(changedMessage);
    }
  };

  const sendMail = async () => {
    const body = {
      email,
      subject,
      message,
    };
    console.log(body);
    const response = await axios.post(`/api/gmail`, body);
    console.log(response);
  };

  return (
    <>
      <div style={style}>
        <h3>Contact Me</h3>
        <Form>
          <Form.Group>
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailOnChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control onChange={subjectOnChange}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              onChange={messageOnChange}
            ></Form.Control>
          </Form.Group>
          <br></br>
          <Button onClick={sendMail}>Send Email</Button>
        </Form>
      </div>
    </>
  );
}

export default MailBox;
