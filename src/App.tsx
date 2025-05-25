import React from 'react';
import './App.css';
import Patient from "./pages/Patient";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Sample from "./pages/Sample";

function App() {
  return (
    <div className="App">
     <Router>
         <Routes>
             <Route path="/" element={<Patient />}/>
             <Route path ="/patient" element={<Sample />}/>
         </Routes>
     </Router>
    </div>
  );
}

export default App;
