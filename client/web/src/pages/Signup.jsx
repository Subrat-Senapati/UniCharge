import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../css/login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { name: fullName, email, phone: phoneNumber, password, confirmPassword } = formData;

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phoneNumber, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again");
    }
  };

  if (success) {
    return (
      <div
        className="login-wrapper d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #69A316, #052730)',
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="success" className="text-center rounded-3 shadow-sm">
                🎉 Account created successfully! Redirecting to login...
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="login-wrapper d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #69A316, #052730)',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <img
                    src="/Unicharge_logo_text.png"
                    alt="Logo"
                    style={{ height: '60px' }}
                  />
                  <h4 className="fw-bold mt-3 text-dark">Create New Account</h4>
                  <p className="text-muted small">
                    Join <strong>UNICHARGE</strong> and power up your journey 🚀
                  </p>
                </div>

                {/* Error message */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      onChange={handleChange}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      onChange={handleChange}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Create password"
                          onChange={handleChange}
                          className="rounded-3"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          onChange={handleChange}
                          className="rounded-3"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    className="w-100 py-2 rounded-3 fw-semibold"
                    style={{ background: '#69A316', border: 'none' }}
                  >
                    Sign Up
                  </Button>
                </Form>

                {/* Login link */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="fw-semibold"
                      style={{ color: '#69A316' }}
                    >
                      Login
                    </Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
