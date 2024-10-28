// src/Component/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [workStatus, setWorkStatus] = useState('');
  // const [salary, setSalary] = useState('');
  // const [location, setLocation] = useState('');
  // const [resume, setResume] = useState(null);
  const [errorMessage] = useState('');  // State for error message

  const navigate = useNavigate();

  // const handleFileChange = (e) => {
  //   setResume(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const formData = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      workStatus: workStatus
      // jobTitle: jobTitle,
      // salary: salary,
      // location: location,
      // resume:resume
    };
    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    // // formDataToSend.append('resume', resume);
    // console.log('Form submitted:', { name, email, password });

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/api/register', formData);

      // After successful registration, navigate to the login page
      if (response.status === 200) {
        //const { userId } = response.data;
        // localStorage.setItem('userId', userId);
        navigate('./Login');  // Redirect to login page
      }

    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
    }
  };

  // Render the registration form
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Name:</label>
            <input type="text" placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <p className="input-hint">This helps your account stay protected</p>
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Phone Number:</label>
            <input type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} required />
          </div>
          {/* <div className="input-group">
            <label>Job Title:</label>
            <input type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Salary:</label>
            <input type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>location:</label>
            <input type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)} required />
          </div> */}
          {/* Work Status Radio Buttons */}
          <div className="input-group">
            <label>Work Status:</label>
            <select value={workStatus} onChange={(e) => setWorkStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="jobSeeker">Job Seeker</option>
              <option value="working">Working</option>
            </select>
          </div>

          <button className="register-button" type="submit">Register</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
export default Register;
