import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AllCourses from "./AllCourses";
import PublicNavbar from "./PublicNavbar";

const Home = () => {
   return (
      <>
         <PublicNavbar />

         <section className="hero">
            <div className="hero-overlay" />
            <Container className="hero-content fade-in">
               <div className="hero-text">
                  <span className="hero-pill">Premium Learning Platform</span>
                  <h1>Upgrade Your Learning Journey</h1>
                  <p>
                     Build future-ready skills with expert mentors, immersive courses,
                     and certifications designed for real-world impact.
                  </p>
                  <div className="hero-actions">
                     <Link to="/register" className="btn-gradient">Explore Courses</Link>
                     <Link to="/login" className="btn-ghost">Sign In</Link>
                  </div>
               </div>
               <div className="hero-card fade-in delay-1">
                  <h4>Trusted by learners worldwide</h4>
                  <p>Join a community focused on consistency, mentorship, and results.</p>
                  <div className="hero-stats">
                     <div>
                        <h3>120+</h3>
                        <span>Courses</span>
                     </div>
                     <div>
                        <h3>24/7</h3>
                        <span>Support</span>
                     </div>
                     <div>
                        <h3>97%</h3>
                        <span>Satisfaction</span>
                     </div>
                  </div>
               </div>
            </Container>
         </section>

         <section className="section features">
            <Container>
               <div className="section-header">
                  <h2>Why learners choose Study App</h2>
                  <p>Everything you need to stay focused, inspired, and ahead.</p>
               </div>
               <div className="feature-grid">
                  <div className="feature-card fade-in">
                     <h4>Expert Mentors</h4>
                     <p>Learn directly from industry professionals with real-world insights.</p>
                  </div>
                  <div className="feature-card fade-in delay-1">
                     <h4>Lifetime Access</h4>
                     <p>Revisit modules any time and keep improving at your own pace.</p>
                  </div>
                  <div className="feature-card fade-in delay-2">
                     <h4>Certification</h4>
                     <p>Showcase verified credentials that strengthen your profile.</p>
                  </div>
               </div>
            </Container>
         </section>

         <section className="section courses" id="courses">
            <Container>
               <div className="section-header">
                  <h2>Trending Courses</h2>
                  <p>Curated picks from our top educators.</p>
               </div>
               <AllCourses />
            </Container>
         </section>
      </>
   )
}

export default Home


