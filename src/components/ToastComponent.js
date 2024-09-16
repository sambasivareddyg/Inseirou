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
        <div class="row mt-3">
          <div class="col-md-6">
            <div class="mb-2">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
            </div>
            <div class="mb-2">
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
            </div>
            <div class="mb-2">
              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter your phone number"
                />
              </Form.Group>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-2">
              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter your message"
                />
              </Form.Group>
            </div>
            <div class="mb-2">
              <Button variant="primary" onClick={handleClick} type="button">
                Submit
              </Button>
            </div>
          </div>
        </div>
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
