import React from "react";
import "./vechile.css";

export default function Vehicle() {
  return (
    <section id="vechile" className="vehicle-section py-5">
      <div className="container text-center mb-4">
        <h1 className="section-title">Vehicles Facility</h1>
        <h6 className="section-subtitle">
          Safe and reliable transportation services to ensure every student
          reaches school comfortably and on time.
        </h6>
      </div>

      <div className="container">
        <div
          id="vehicleCarousel"
          className="carousel slide  rounded overflow-hidden"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://themewagon.github.io/adward/images/bus.png"
                className="d-block w-100 vehicle-img"
                alt="School Bus"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://themewagon.github.io/adward/images/bus.png"
                className="d-block w-100 vehicle-img"
                alt="Transport"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://themewagon.github.io/adward/images/bus.png"
                className="d-block w-100 vehicle-img"
                alt="Bus Facility"
              />
            </div>
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#vehicleCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#vehicleCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
