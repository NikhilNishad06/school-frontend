import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";

export default function DashBoard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API = "https://school-backend-k2gi.onrender.com/admission";

  // 🟢 FETCH DATA
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // 🔍 SEARCH FILTER
  const filtered = data.filter((item) =>
    `${item.studentFirstName} ${item.studentLastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🗑 DELETE DATA
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const val = await res.json();
      alert(val.msg || "Deleted successfully!");
      setData((prev) => prev.filter((item) => (item.id || item._id) !== id));
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  // ✏️ OPEN EDIT
  const openEdit = (item) => {
    setSelected(item);
    setForm(item);
  };

  // 💾 SAVE UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/${selected.id || selected._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (res.ok) {
        alert(json.msg || "Updated successfully!");
        setData((prev) =>
          prev.map((i) => ((i.id || i._id) === (selected.id || selected._id) ? { ...i, ...form } : i))
        );
        setSelected(null);
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("editModal")
        );
        modal.hide();
      } else {
        alert("Update failed: " + json.msg);
      }
    } catch (err) {
      alert("Error updating: " + err.message);
    }
  };

  // 🧩 HANDLE INPUT CHANGE
  const handleChange = (field, value, nested = null) => {
    if (nested) {
      setForm((prev) => ({
        ...prev,
        [nested]: { ...prev[nested], [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
    <Navbar />
    <div className="dashboard-container">
      <div className="container">
        {/* HEADER */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-4">
          <h2 className="dashboard-title">
             <i className="bi bi-mortarboard-fill me-2"></i> Admission <span>Dashboard</span>
          </h2>
          <div className="search-wrapper">
             <span className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             </span>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* DATA DISPLAY */}
        {loading ? (
          <div className="professional-loader-container">
             <span className="professional-loader"></span>
             <p className="loader-text text-uppercase small">Loading Records</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
             <p className="text-muted fs-5">No records found matching your search.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((val) => (
              <div key={val.id || val._id} className="col-md-6 col-lg-4">
                <div className="student-card">
                  <div className="card-header-accent"></div>
                  <div className="p-4 flex-grow-1">
                    <h5 className="student-name">
                      {val.studentFirstName} {val.studentLastName}
                    </h5>
                    <span className="student-class">Class {val.classAppliedFor}</span>
                    
                    <div className="info-list">
                      <div className="info-item">
                         <span className="info-icon">🎂</span>
                         <span className="info-label">Birth Date</span>
                         <span className="info-value">{val.dateOfBirth}</span>
                      </div>
                      <div className="info-item">
                         <span className="info-icon">🛡️</span>
                         <span className="info-label">Guardian</span>
                         <span className="info-value">{val.guardianFirstName} {val.guardianLastName}</span>
                      </div>
                      <div className="info-item">
                         <span className="info-icon">📞</span>
                         <span className="info-label">Phone</span>
                         <span className="info-value">{val.contact?.phone || "N/A"}</span>
                      </div>
                      <div className="info-item">
                         <span className="info-icon">✉️</span>
                         <span className="info-label">Email</span>
                         <span className="info-value">{val.contact?.email || "N/A"}</span>
                      </div>
                      <div className="info-item">
                         <span className="info-icon">📍</span>
                         <span className="info-label">Address</span>
                         <span className="info-value">{val.address?.street}, {val.address?.city}</span>
                      </div>
                      <div className="info-item">
                         <span className="info-icon">✍️</span>
                         <span className="info-label">Signed</span>
                         <span className="info-value">{val.signature || "Pending"}</span>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn-edit-admin"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => openEdit(val)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Edit
                      </button>
                      <button
                        className="btn-delete-admin"
                        onClick={() => handleDelete(val.id || val._id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDIT MODAL */}
        <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
              <div className="admin-modal-header d-flex justify-content-between align-items-center">
                <h5 className="admin-modal-title mb-0 fs-4">Edit Admission Record</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="admin-modal-body">
                {selected ? (
                  <form onSubmit={handleSubmit} className="row g-4">
                    <div className="col-md-6">
                      <label className="admin-form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control admin-form-input"
                        value={form.studentFirstName || ""}
                        onChange={(e) => handleChange("studentFirstName", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="admin-form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control admin-form-input"
                        value={form.studentLastName || ""}
                        onChange={(e) => handleChange("studentLastName", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="admin-form-label">Class Applied</label>
                      <input
                        type="text"
                        className="form-control admin-form-input"
                        value={form.classAppliedFor || ""}
                        onChange={(e) => handleChange("classAppliedFor", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="admin-form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control admin-form-input"
                        value={form.dateOfBirth || ""}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                    
                    <div className="col-12 mt-4 mb-2">
                       <h6 className="fw-bold text-dark opacity-75">Guardian & Contact</h6>
                    </div>

                    <div className="col-md-6">
                      <label className="admin-form-label">Guardian First Name</label>
                      <input
                        type="text"
                        className="form-control admin-form-input"
                        value={form.guardianFirstName || ""}
                        onChange={(e) => handleChange("guardianFirstName", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="admin-form-label">Guardian Last Name</label>
                      <input
                        type="text"
                        className="form-control admin-form-input"
                        value={form.guardianLastName || ""}
                        onChange={(e) => handleChange("guardianLastName", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="admin-form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control admin-form-input"
                        value={form.contact?.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value, "contact")}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="admin-form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control admin-form-input"
                        value={form.contact?.email || ""}
                        onChange={(e) => handleChange("email", e.target.value, "contact")}
                      />
                    </div>

                    <div className="col-12 mt-4">
                      <button type="submit" className="btn w-100 py-3 fw-bold text-white shadow-sm" style={{ background: '#f59e0b', borderRadius: '12px' }}>
                        Update Record
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-center py-4">Loading form data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
