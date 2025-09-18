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
    if (email === 'user@example.com' && password === 'password') {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login success
    navigate('/');
  }

  return (
    <div className="login-wrapper h-100">
      {/* Top-left logo */}
      <img src="/Unicharge_logo_text.png" alt="Logo" className="app-logo" />

      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left side */}
          <Col md={6} className="d-flex align-items-center justify-content-center text-white left-content">
            <div className="text-center px-5">
              <h1 className="display-4 fw-bold">Welcome Back ⚡</h1>
              <p className="lead mt-3">
                Charge your world with <span className="fw-bold">UNICHARGE</span>
              </p>
            </div>
          </Col>

          {/* Right side */}
          <Col md={6} className="d-flex align-items-center justify-content-center right-content">
            <Card className="login-card shadow-lg p-4 border-0">
              <Card.Body>
                <h3 className="mb-4 text-center text-dark fw-semibold">Login to Your Account</h3>
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

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 py-2"
                    style={{ background: '#69A316', border: 'none', borderRadius: '8px' }}
                  >
                    Login
                  </Button>
                </Form>

                {/* Divider */}
                <div className="text-center my-2">
                  <hr />
                  <span className="text-muted">OR</span>
                  <hr />
                </div>

                {/* Google login */}
                <Button
                  className="google-login-btn w-100 mb-3 d-flex align-items-center justify-content-center gap-3"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                      pointerEvents: "none"
                    }}
                  />
                  Login with Google
                </Button>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-decoration-none fw-semibold" style={{ color: '#052730' }}>
                      Sign up
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