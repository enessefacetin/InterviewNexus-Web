import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
      <footer className="footer">
        <ul className="footer-links">
          <li><a href="https://github.com/enessefacetin/InterviewNexus-Web" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
          <li><a href="https://yourprojectdocumentation.com" target="_blank" rel="noopener noreferrer">Documentation</a></li>
          <li><a href="https://yourprojectcontributionguide.com" target="_blank" rel="noopener noreferrer">How to Contribute</a></li>
        </ul>
        <p className="footer-text">© 2024 Interview Nexus</p>
      </footer>
    );
  };

export default Footer