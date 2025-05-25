import React from 'react';
import './App.css';
import Home from "./pages/Home";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Patient from "./pages/Patient";
import Doctor from "./pages/Doctor";
import Appointment from "./pages/Appointment";
import Billing from "./pages/Billing";

function App() {
  return (
    <div className="App">
     <Router>
         <Routes>
             <Route path="/" element={<Home />}/>
             <Route path ="/patient" element={<Patient />}/>
             <Route path="/doctor" element={<Doctor />}/>
             <Route path="/appointment" element={<Appointment />}/>
             <Route path="/billing" element={<Billing />}/>
         </Routes>
     </Router>
    </div>
  );
}

export default App;
