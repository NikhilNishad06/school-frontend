import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./admission.css";

export default function Admission() {
  const navigate = useNavigate();
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [classAppliedFor, setClassAppliedFor] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [guardianFirstName, setGuardianFirstName] = useState("");
  const [guardianLastName, setGuardianLastName] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      studentFirstName,
      studentLastName,
      classAppliedFor,
      dateOfBirth,
      guardianFirstName,
      guardianLastName,
      address: {
        street,
        street2,
        city,
        region,
        postalCode,
        country,
      },
      contact: {
        phone,
        email,
      },
      signature,
    };

    fetch("https://school-backend-k2gi.onrender.com/admission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Application submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong.");
      });
  };

  return (
    <>
    <Navbar />
    <section id="admission" className="admission-section">
      <div className="container form-container">
        <div className="d-flex justify-content-end align-items-center mb-4">
          <button 
            className="btn-admin-data"
            onClick={() => navigate("/dashboard")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            Admission Data
          </button>
        </div>
        <div className="text-center mb-5">
          <h1 className="section-title">Admission Application</h1>
          {/* <p className="section-subtitle"> provide accurate information to begin the enrollment process.</p> */}
        </div>

        <form className="admission-form" onSubmit={handleSubmit}>
          {/* Section: Student Information */}
          <div className="form-group-section mb-5">
            <h3 className="form-group-title">Student Information</h3>
            <div className="row row-gap">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. John"
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Doe"
                  value={studentLastName}
                  onChange={(e) => setStudentLastName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Class Applied For</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Class"
                  value={classAppliedFor}
                  onChange={(e) => setClassAppliedFor(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Guardian Information */}
          <div className="form-group-section mb-5">
            <h3 className="form-group-title">Parent / Guardian Information</h3>
            <div className="row row-gap">
              <div className="col-md-6">
                <label className="form-label">Guardian First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={guardianFirstName}
                  onChange={(e) => setGuardianFirstName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Guardian Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={guardianLastName}
                  onChange={(e) => setGuardianLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section: Address Details */}
          <div className="form-group-section mb-5">
            <h3 className="form-group-title">Residential Address</h3>
            <div className="row row-gap">
              <div className="col-12">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="House No, Street Name"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={street2}
                  onChange={(e) => setStreet2(e.target.value)}
                />
              </div>
              <div className="col-12">
                <div className="address-row">
                  <div>
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Region</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State/Prov"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section: Contact & Authentication */}
          <div className="form-group-section mb-4">
            <h3 className="form-group-title">Contact & Finalization</h3>
            <div className="row row-gap">
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="helper-text">Official communications will be sent here.</p>
              </div>
              <div className="col-12">
                <label className="form-label">Electronic Signature</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your full legal name"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
                <p className="helper-text">By typing your name, you confirm the accuracy of the information provided.</p>
              </div>
            </div>
          </div>

          <div className="form-actions mt-5">
            <button type="submit" className="btn-submit">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
}
