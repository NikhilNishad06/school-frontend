import React from "react";
import "../home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section id="home" className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Section */}
            <div className="col-md-6 text-white hero-text">
              <h4 className="fw-light">Welcome to</h4>
              <h2 className="fw-bold">Best educations</h2>
              <h1 className="fw-bold text-warning display-4">SCHOOL</h1>
              <p className="mt-3 lead">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised.
              </p>
              <Link to={"/admission"}>
                <button className="btn btn-warning fw-bold mt-4 px-4 py-2 rounded-pill shadow">
                  Admission Open <span className="ms-2">➜</span>
                </button>
              </Link>
            </div>

            {/* Right Section */}
            <div className="col-md-6 text-center">
              <img
                src="https://themewagon.github.io/adward/images/hero.png"
                alt="School Kids Illustration"
                className="img-fluid kids-img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
