import React, { useState } from "react";
import "./StudentForm.css";

const StudentForm = ({ student, onClose }) => {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    entry_number: student?.entry_number || "",
    batch: student?.batch || "", // ✅ Added batch field
    marks: student?.marks || "",
    attendance_percentage: student?.attendance_percentage || "", // ✅ Fixed field name
    grade: student?.grade || "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert necessary fields to appropriate data types
    const payload = {
      ...formData,
      marks: parseFloat(formData.marks), // ✅ Convert to float
      attendance_percentage: parseFloat(formData.attendance_percentage), // ✅ Convert to float
      grade: formData.grade.trim() ? formData.grade : null, // ✅ Set to null if empty
    };

    const url = student
      ? `http://127.0.0.1:8000/api/student/update/${student.id}/`
      : "http://127.0.0.1:8000/api/student/create/";

    const method = student ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      console.log("Form submitted successfully!");
      onClose(); // Close form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error: Could not submit student details.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{student ? "Edit Student" : "Add New Student"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="entry_number" placeholder="Entry Number" value={formData.entry_number} onChange={handleChange} required />
          <select name="batch" value={formData.batch} onChange={handleChange} required> {/* ✅ Dropdown for batch */}
            <option value="">Select Batch</option>
            <option value="2024">Batch 2024</option>
            <option value="2025">Batch 2025</option>
          </select>
          <input type="number" name="marks" placeholder="Marks" value={formData.marks} onChange={handleChange} required />
          <input type="number" name="attendance_percentage" placeholder="Attendance %" value={formData.attendance_percentage} onChange={handleChange} required />
          <input type="text" name="grade" placeholder="Grade (optional)" value={formData.grade} onChange={handleChange} />
          <button type="submit">{student ? "Update Student" : "Add Student"}</button>
          <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
