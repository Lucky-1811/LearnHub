import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { UserContext } from "../../App";
import { NavLink } from "react-router-dom";

const NavBar = ({ setSelectedComponent }) => {

   const user = useContext(UserContext)
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 10);
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   if (!user) {
      return null
   }


   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
   }
   const handleOptionClick = (component) => {
      setSelectedComponent(component);
   };

   return (
      <Navbar
         expand="lg"
         sticky="top"
         className={`navbar-root ${scrolled ? "navbar-scrolled" : ""}`}
      >
         <Container fluid>
            <Navbar.Brand href="/dashboard" className="brand-title">
               Study App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto nav-links" navbarScroll>
                  <a href="/dashboard" className="nav-link-custom">Home</a>
                  {user.userData.type === 'Teacher' && (
                     <NavLink onClick={() => handleOptionClick('addcourse')} className="nav-link-custom">Add Course</NavLink>
                  )}
                  {user.userData.type === 'Admin' && (
                     <NavLink onClick={() => handleOptionClick('cousres')} className="nav-link-custom">Courses</NavLink>
                  )}
                  {user.userData.type === 'Student' && (
                     <NavLink onClick={() => handleOptionClick('enrolledcourese')} className="nav-link-custom">Enrolled Courses</NavLink>
                  )}
               </Nav>
               <Nav className="nav-profile">
                  <span className="nav-greeting">Hi {user.userData.name}</span>
                  <Button onClick={handleLogout} size="sm" className="btn-outline">Log Out</Button>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default NavBar

