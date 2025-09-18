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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  if (success) {
    return (
      <div className="login-wrapper">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="success" className="text-center">
                Account created successfully!
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      <img src="/Unicharge_logo_text.png" alt="App Logo" className="app-logo" />
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col md={6} className="left-content text-center text-md-start mb-5 mb-md-0">
            <h1 className="display-4 fw-bold text-white">Welcome to UNICHARGE</h1>
            <p className="lead text-light">Power up your journey with seamless EV charging.</p>
          </Col>

          <Col md={6} className="right-content">
            <Card className="signup-card shadow-lg">
              <Card.Body>
                <div className="text-center mb-4">
                  <h3 className="mb-4 text-center text-dark fw-semibold">Create New Account</h3>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Enter Email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="Enter phone number"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Create password"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100" style={{ background: '#69A316', border: 'none', borderRadius: '8px' }}>
                    Sign Up
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: '#052730' }}>
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