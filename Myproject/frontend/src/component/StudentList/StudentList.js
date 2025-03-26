import React, { useEffect, useState } from "react";
import StudentForm from "../StudentForm/StudentForm";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; 

  // Fetch Students from API
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

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/student/delete/${id}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete student");

      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  // Handle Edit
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  // Handle Student Addition/Update (Triggers a refresh)
  const handleFormClose = () => {
    setShowForm(false);
    setSelectedStudent(null);
    fetchStudents(); // Refresh student list
  };

  // Filtered Student List
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || student.batch === filter) // ✅ Fixed batch filtering
    );
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Handle Page Change
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  return (
    <div className="student-container">
      <div className="top-section">
        {/* Search & Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Batches</option>
            <option value="2024">Batch 2024</option> {/* ✅ Fixed batch values */}
            <option value="2025">Batch 2025</option>
          </select>
        </div>
        <button className="add-student-btn" onClick={() => setShowForm(true)}>
          + Add Student
        </button>
      </div>

      {/* Student Table */}
      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Entry Number</th>
              <th>Batch</th> {/* ✅ Added batch column */}
              <th>Marks</th>
              <th>Attendance (%)</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.entry_number}</td>
                  <td>{student.batch}</td> {/* ✅ Display batch */}
                  <td>{student.marks}</td>
                  <td>{student.attendance_percentage}%</td> {/* ✅ Fixed field name */}
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
      <div className="pagination">
        <button className="page-btn" onClick={goToPrevPage} disabled={currentPage === 1}>
          ◀ Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button className="page-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next ▶
        </button>
      </div>

      {/* Student Form Modal */}
      {showForm && <StudentForm student={selectedStudent} onClose={handleFormClose} />}
    </div>
  );
};

export default StudentList;
