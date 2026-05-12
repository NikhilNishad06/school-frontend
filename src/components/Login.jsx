import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://school-backend-k2gi.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert(data.message || data.msg || "Login successful!");
      navigate("/");
    } else {
      alert(data.msg || "Login failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="school-logo-circle">
           <i className="bi bi-mortarboard-fill"></i>
        </div>
        <div className="auth-header">
          <h2>Student Login</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              className="auth-input"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-1">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
