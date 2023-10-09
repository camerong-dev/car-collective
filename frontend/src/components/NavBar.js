import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { logoutUser } from "./Logout";
import jwtDecode from "jsonwebtoken/decode";

function CollapsibleNav() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      const token = localStorage.getItem("access_token");
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.user_name);
    }
  }, []);

  const handleLogoutClick = () => {
    logoutUser();
    setUserName(null);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Car Collective</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">hi</Nav.Link>
            <Nav.Link href="#pricing">#</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn() ? (
              <NavDropdown
                title={userName || "Loading..."}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogoutClick}>
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

function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}

export default CollapsibleNav;
