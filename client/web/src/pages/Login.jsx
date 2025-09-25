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
    // simple demo login
    if (email === 'user@example.com' && password === 'password') {
      navigate('/home');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    navigate('/');
  };

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
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <img
                    src="/Unicharge_logo_text.png"
                    alt="Logo"
                    style={{ height: '60px' }}
                  />
                  <h4 className="fw-bold mt-3 text-dark">Welcome Back ⚡</h4>
                  <p className="text-muted small">
                    Charge your world with <strong>UNICHARGE</strong>
                  </p>
                </div>

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 py-2 rounded-3 fw-semibold"
                    style={{ background: '#69A316', border: 'none' }}
                  >
                    Login
                  </Button>
                </Form>

                {/* Divider */}
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-2 text-muted">OR</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Google Login */}
                <Button
                  variant="light"
                  className="w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span className="fw-semibold">Login with Google</span>
                </Button>

                {/* Signup link */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Don’t have an account?{' '}
                    <Link
                      to="/signup"
                      className="fw-semibold"
                      style={{ color: '#69A316' }}
                    >
                      Sign Up
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

export default Login;
