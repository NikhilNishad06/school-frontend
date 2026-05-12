import React, { useState } from "react";
import "./contact.css";

export default function Contact() {
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState(""); // ✅ lowercase u

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://school-backend-k2gi.onrender.com/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, userNumber, userEmail, userMessage }), // ✅ corrected key
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.msg || "Message sent successfully!");
        // Optional: reset form
        setUserName("");
        setUserNumber("");
        setUserEmail("");
        setUserMessage("");
      } else {
        alert(result.msg || "Failed to send message!");
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <section id="contact" className="py-5">
      <div className="container text-center mb-4">
        <h2 className="fw-bold">Contact Us</h2>
        <p>We will respond as soon as possible.</p>
      </div>

      <div className="container">
        <div className="row g-4 align-items-start">
          {/* Left: Contact Form */}
          <div className="col-lg-6">
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white rounded shadow-sm"
            >
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Phone Number"
                value={userNumber}
                onChange={(e) => setUserNumber(e.target.value)}
                required
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email Address"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Your Message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                required
              ></textarea>

              <button className="btn btn-warning w-100 fw-bold">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Google Map */}
          <div className="col-lg-6">
            <div className="rounded overflow-hidden shadow-sm">
              <iframe
                title="bhilai-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.5058106088856!2d81.35000077508235!3d21.20910098252026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2922820e2d761f%3A0xdda8aa1e65e2e51!2sBhilai%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1707220000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
  