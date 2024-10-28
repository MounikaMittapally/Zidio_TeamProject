import React from 'react';
import Image from '../img/Web-design.jpg';

const header = () => {
  const userName = localStorage.getItem('userName');
  console.log('username at header',userName);
  return (
    <div className="header">
      <div className="search-bar" style={{paddingLeft:'500px'}}>
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-icons">
        <i className="fas fa-bell"></i> {/* Notifications icon */}
        <div className="profile-dropdown">
          <img src={Image} alt="Profile"  style={{ paddingLeft: '250px',height:'640px' }}  />
          <span>{userName || 'Name not available'}</span>
        </div>
      </div>
    </div>
  );  
}

export default header;
