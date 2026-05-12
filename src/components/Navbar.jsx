import React, { useState, useEffect } from "react";
import "../home.css";
import "../loader.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ FIXED
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://school-backend-k2gi.onrender.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.msg === "Invalid token") {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setUser(data.user || data); // ✅ handles both {user:{...}} or {...}
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  if (!user) {
    return (
      <div className="page-loader-container">
        <div className="professional-page-loader"></div>
        <div className="loader-branding">
          <h2>NIKHIL <span>SCHOOL</span></h2>
          <p>Initializing App</p>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#f59e0b" }}>
          <i className="bi bi-mortarboard-fill me-2" style={{ color: "#f59e0b" }}></i> NIKHIL{" "}
          <span className="text-dark">SCHOOL</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/#home" onClick={() => scrollToSection("home")}>
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/#about" onClick={() => scrollToSection("about")}>
                About
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/#teacher" onClick={() => scrollToSection("teacher")}>
                Teacher
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/#vechile" onClick={() => scrollToSection("vechile")}>
                Vehicle
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/admission" className="nav-link fw-semibold">
                Admission
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/#contact" onClick={() => scrollToSection("contact")}>
                Contact Us
              </Link>
            </li>

            {/* ✅ User Info & Logout */}
            <li className="nav-item dropdown mx-2">
              <button
                className="btn btn-outline-warning dropdown-toggle fw-semibold"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.name || "Profile"}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <i className="bi bi-search ms-3 fs-5 text-muted"></i>
        </div>
      </div>
    </nav>
  );
}
