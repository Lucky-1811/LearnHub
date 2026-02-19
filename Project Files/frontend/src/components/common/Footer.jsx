import React from "react";

const Footer = ({ year }) => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Study App</h3>
          <p>Modern learning for ambitious students and professionals.</p>
        </div>
        <div className="footer-links">
          <div>
            <h6>About</h6>
            <p>Expert-led courses, lifetime access, and career-ready skills.</p>
          </div>
          <div>
            <h6>Quick Links</h6>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
          <div>
            <h6>Contact</h6>
            <ul>
              <li>support@studyapp.com</li>
              <li>+1 (555) 234-9876</li>
              <li>Global Remote</li>
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
          <a href="https://www.twitter.com" aria-label="Twitter">x</a>
          <a href="https://www.github.com" aria-label="GitHub">gh</a>
        </div>
      </div>
      <div className="footer-bottom">© {year} Study App. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
