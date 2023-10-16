import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function CollapsibleNav({ isUserLoggedIn, userName, handleLogout }) {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    handleLogout();
    navigate("/");
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Car Collective</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isUserLoggedIn && <Nav.Link href="/newpost">Create Post</Nav.Link>}
          </Nav>
          <Nav>
            {isUserLoggedIn ? (
              <NavDropdown
                title={"Welcome, " + userName}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item onClick={onLogoutClick}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/signin">Sign In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleNav;
