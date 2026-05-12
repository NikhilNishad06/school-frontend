import React, { useState, useEffect } from "react";
import "./usermessage.css";

export default function UserMessage() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch all messages
  useEffect(() => {
    fetch("https://school-backend-k2gi.onrender.com/user")
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched data:", result);
        if (Array.isArray(result.studentData)) setData(result.studentData);
        else if (Array.isArray(result.data)) setData(result.data);
        else if (Array.isArray(result)) setData(result);
        else setData([]);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  // 🟥 Delete
  const handleDel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`https://school-backend-k2gi.onrender.com/user/del/${id}`, {
        method: "DELETE",
      });
      const val = await res.json();
      alert(val.msg || "Deleted successfully!");
      setData((prev) => prev.filter((item) => (item.id || item._id) !== id));
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  // 🟡 Edit popup
  const handleUpdate = (item) => {
    setEditData(item);
    setNewMessage(item.userMessage);
  };

  // 🟢 Save updated message
  const saveUpdate = async () => {
    if (!newMessage.trim()) return alert("Message cannot be empty!");

    try {
      const res = await fetch(
        `https://school-backend-k2gi.onrender.com/user/update/${editData.id || editData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: newMessage }),
        }
      );

      const result = await res.json();
      alert(result.msg || "Message updated!");

      setData((prev) =>
        prev.map((item) =>
          (item.id || item._id) === (editData.id || editData._id)
            ? { ...item, userMessage: newMessage }
            : item
        )
      );
      setEditData(null);
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (!data.length) return <p>No messages found.</p>;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {data.map((val) => (
          <div
            key={val.id || val._id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h5 className="fw-bold text-primary">{val.userName}</h5>
            <p>{val.userEmail}</p>
            <p>{val.userNumber}</p>
            <p>{val.userMessage}</p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDel(val.id || val._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => handleUpdate(val)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {editData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "350px",
            }}
          >
            <h4>Update Message</h4>
            <textarea
              className="form-control"
              rows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="d-flex justify-content-between mt-2">
              <button className="btn btn-success" onClick={saveUpdate}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
