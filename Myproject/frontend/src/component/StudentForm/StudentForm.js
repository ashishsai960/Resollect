import React, { useState } from "react";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import "./StudentForm.css";

const StudentForm = ({ student, onClose }) => {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    entry_number: student?.entry_number || "",
    batch: student?.batch || "",
    marks: student?.marks || "",
    attendance_percentage: student?.attendance_percentage || "",
    grade: student?.grade || "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      marks: parseFloat(formData.marks),
      attendance_percentage: parseFloat(formData.attendance_percentage),
      grade: formData.grade.trim() ? formData.grade : null,
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

      Toast.fire({
        icon: "success",
        title: student ? "Student updated successfully!" : "Student added successfully!",
      });

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not submit student details.",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{student ? "Edit Student" : "Add New Student"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="entry_number" placeholder="Entry Number" value={formData.entry_number} onChange={handleChange} required />
          <select name="batch" value={formData.batch} onChange={handleChange} required>
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
