import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used
import '../CSS/sidebar.css';
const sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/jobseeker">My Profile</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
}

export default sidebar;
