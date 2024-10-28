import React from 'react';
  import Register from './Component/Register';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Login from './Component/Login'; 
 import JobSeeker from './Component/JobSeeker'; 
 import Employer from './Component/Employer'; 
 import Dashboard from './Component/Dashboard';
 import ProfilePage from './Component/ProfilePage';

 function App() {
console.log("in App ");
 
  return(
  //      <div className="App">
  //    <Register /> {/* This will display the register form when the app loads */}
  //  </div>
    <Router>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/JobSeeker" element={<JobSeeker />} />
      <Route path="/Employer" element={<Employer />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </Router>
   );
   }
 export default App;
