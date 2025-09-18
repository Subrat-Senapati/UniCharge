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
    address: '',
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
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Add your signup logic here
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  if (success) {
    return (
      <div className="login-container">
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
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-4">
              <h1 className="logo-animation">UNICHARGE</h1>
            </div>
            <Card className="login-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Row>
                    <Col md={6}>
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter full address"
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

                  <Button variant="primary" type="submit" className="w-100">
                    Sign Up
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <Link to="/login">Already have an account? Login</Link>
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