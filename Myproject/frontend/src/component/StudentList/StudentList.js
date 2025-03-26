import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StudentForm from "../StudentForm/StudentForm";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 9;

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/student/list/");
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/student/delete/${id}/`, { method: "DELETE" });
          if (!response.ok) throw new Error("Failed to delete student");

          setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
          Swal.fire("Deleted!", "The student has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting student:", error);
          Swal.fire("Error!", "Failed to delete student.", "error");
        }
      }
    });
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedStudent(null);
    fetchStudents();
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || student.batch === filter)
    );
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="student-container">
      <div className="top-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Batches</option>
            <option value="2024">Batch 2024</option>
            <option value="2025">Batch 2025</option>
          </select>
        </div>
        <button className="add-student-btn" onClick={() => setShowForm(true)}>
          Add New Student
        </button>
      </div>

      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Entry Number</th>
              <th>Batch</th>
              <th>Marks</th>
              <th>Attendance (%)</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.entry_number}</td>
                  <td>{student.batch}</td>
                  <td>{student.marks}</td>
                  <td>{student.attendance_percentage}%</td>
                  <td>{student.grade || "N/A"}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No Students Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="portfolio-footer">
        <span>
          Showing {indexOfFirstStudent + 1}–{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} results
        </span>
        <div className="pagination-controls">
          <button className="pagination-btn" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <button className="pagination-btn" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {showForm && <StudentForm student={selectedStudent} onClose={handleFormClose} />}
    </div>
  );
};

export default StudentList;
