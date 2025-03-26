// src/App.js
import React from "react";
import "./App.css"
import Navbar from "./component/Navbar/Navbar";
import Slidebar from "./component/Slidebar/Slidebar";
import StudentList from "./component/StudentList/StudentList";


const App = () => {
  return (
    
      <div>
      <Navbar />
      
      <Slidebar />
      <div className="content">
        <h2>Welcome to Dashboard</h2>
        <StudentList />
      </div>
      
    </div>
    
    
  );
};

export default App;
