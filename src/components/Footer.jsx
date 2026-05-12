import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-section text-white pt-5">
      <div className="container">
        <div className="row">
          {/* Brand / About */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">MySchool</h5>
            <p className="footer-text">
              Empowering students with knowledge and values for a brighter
              future. Safe, reliable, and student-focused learning environment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Facilities
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p className="footer-text">📍 123 School Road, New Delhi</p>
            <p className="footer-text">📞 +91 6264345297</p>
            <p className="footer-text">✉️ info@myschool.com</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="bg-light" />

        {/* Bottom Note */}
        <div className="text-center pb-3">
          <p className="mb-0">
            © 2025 MySchool. All Rights Reserved | Powered by Nikhil
          </p>
        </div>
      </div>
    </footer>
  );
}
