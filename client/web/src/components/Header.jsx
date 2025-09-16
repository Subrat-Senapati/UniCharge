import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import logo from '';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
            <img src="/Unicharge_logo.png" width="50" height="50" className="d-inline-block align-top" alt="EVPoint logo" />
            <img src="/Unicharge_logo_text.png" width="150" height="50" className="d-inline-block align-top" alt="EVPoint logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#about-us">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#signin">Sign In</Nav.Link>
            <Button variant="success" className="ms-3">
              Download App
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;