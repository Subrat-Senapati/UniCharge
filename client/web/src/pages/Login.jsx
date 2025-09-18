import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - replace with actual authentication logic
    if (email === 'user@example.com' && password === 'password') {
      navigate('/'); // Redirect to home on success
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <div className="text-center mb-4">
              <h1 className="logo-animation">UNICHARGE</h1>
            </div>
            <Card className="login-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <Link to="/signup">Create an account</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;