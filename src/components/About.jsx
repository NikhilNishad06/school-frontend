import React from "react";
import "./about.css"; // custom styles

export default function About() {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="about-title mb-3">About Our School</h2>
            <p className="about-text">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form. Our school
              is dedicated to providing a nurturing environment where students
              learn, grow, and achieve their dreams.
            </p>
            <button className="btn btn-warning px-4 py-2 fw-bold shadow-sm mt-3">
              Read More
            </button>
          </div>

          {/* Image Content */}
          <div className="col-lg-6 text-center">
            <img
              src="https://themewagon.github.io/adward/images/kids.jpg"
              alt="About School"
              className="img-fluid rounded  about-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
