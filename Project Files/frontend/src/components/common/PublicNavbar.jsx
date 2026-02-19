import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar expand="lg" sticky="top" className={`navbar-root ${scrolled ? "navbar-scrolled" : ""}`}>
      <Container fluid>
        <Navbar.Brand href="/" className="brand-title">
          Study App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto nav-links" navbarScroll>
            <NavLink to="/" className="nav-link-custom">Home</NavLink>
            <a href="/#courses" className="nav-link-custom">Courses</a>
            <NavLink to="/login" className="nav-link-custom">Login</NavLink>
            <NavLink to="/register" className="nav-link-custom">Register</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;
