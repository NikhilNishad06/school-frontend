import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://school-backend-k2gi.onrender.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.msg);
      navigate("/login");
    } else {
      alert(data.msg || "Registration failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="school-logo-circle">
           <i className="bi bi-person-plus-fill"></i>
        </div>
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join our student community today.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              className="auth-input"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-1">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              className="auth-input"
              placeholder="name@school.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-1">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Register Now
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
