import "../App.css";
import "../assets/css/CustomNavbar.css";
import { Form, Button, Container } from "react-bootstrap";
import CustomNavbar from "./CustomNavbar";
import BreadcrumbComponent from "./BreadcrumbComponent";
import React, { useEffect } from "react";
import ToastComponent from "./ToastComponent";

function Contact() {
  return (
    <div>
      <CustomNavbar />
      <main role="main">
        <div className="container-fluid jumbotron jumbotron-other py-5">
          <div className="container">
            <h1 className="display-3 d-none d-md-block text-white">
              Send us an email, we'd love to hear from you.
            </h1>
          </div>
        </div>

        <Container>
          <h2>Contact Us</h2>
          <ToastComponent />
        </Container>
      </main>
    </div>
  );
}
export default Contact;
