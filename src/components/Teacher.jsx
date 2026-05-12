import React from "react";
import "./Teacher.css";

export default function Teacher() {
  const teachers = [
    {
      name: "John Doe",
      subject: "Mathematics",
      img: "https://themewagon.github.io/adward/images/teacher-1.jpg",
    },
    {
      name: "Sarah Smith",
      subject: "Science",
      img: "https://themewagon.github.io/adward/images/teacher-2.jpg",
    },
    {
      name: "Michael Lee",
      subject: "English",
      img: "https://themewagon.github.io/adward/images/teacher-3.jpg",
    },
    {
      name: "Emily Johnson",
      subject: "History",
      img: "https://themewagon.github.io/adward/images/teacher-4.jpg",
    },
  ];

  return (
    <section id="teacher" className="teacher-section py-5">
      <div className="container text-center mb-4">
        <h1 className="section-title">Our Teachers</h1>
        <h6 className="section-subtitle">
          Dedicated and passionate educators helping students succeed
        </h6>
      </div>

      <div className="container">
        <div className="row g-4">
          {teachers.map((teacher, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card teacher-card shadow-sm h-100 text-center">
                <img
                  src={teacher.img}
                  className="card-img-top teacher-img"
                  alt={teacher.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{teacher.name}</h5>
                  <p className="card-text text-muted">{teacher.subject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-warning px-4 py-2 fw-bold shadow-sm rounded-pill">
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
