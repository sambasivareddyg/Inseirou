import React, { useEffect, useState, useRef } from "react";
import Toast from "react-bootstrap/Toast";
import { Form, Button, Container } from "react-bootstrap";

function ToastComponent() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    // setTimeout(() => setShow(false), 3000); // Auto-hide the toast after 3 seconds
  };
  return (
    <div>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleClick} type="button">
          Submit
        </Button>
      </Form>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <Toast onClose={() => setShow(false)} show={show}>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>Submitted successfully!</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default ToastComponent;
