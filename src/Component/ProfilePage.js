import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ProfilePage.css';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState('');
  const [showEditPersonal, setShowEditPersonal] = useState(false);
  const [showEditEducation, setShowEditEducation] = useState(false);
  const userId = localStorage.getItem('userId');// Use the logged-in user's userId
  const userName = localStorage.getItem('userName');
  const dateFormat = '';
  const educationDetails = '';
  if (profileData.jobSeekerProfile) {
    dateFormat = new Date(profileData.jobSeekerProfile.dob).toISOString().split('T')[0];
    educationDetails = profileData.jobSeekerProfile?.education || [];
  }
  useEffect(() => {
    // Fetch user prof ile data from the API

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    

    fetchProfileData();
  }, [userId]);

  if (!profileData) {
    return <p>No profile data found</p>;
  }

  // Display registration details and job seeker details
  return (

    <div className="profile-container">

      {profileData.jobSeekerProfile ? (

        <div>
          <p><strong style={{ fontSize: '20px' }}> {profileData.jobSeekerProfile.fullName}</strong></p>
          <p> {profileData.jobSeekerProfile.jobTitle}</p>
          <div className="card">
            <div className="card-header">
              <h3>Personal Details</h3>
              <button onClick={() => setShowEditPersonal(!showEditPersonal)}>✏️ Edit</button>
            </div>
            <div className="card-body">
              <p><strong>Email:</strong> {profileData.user.email}</p>
              <p><strong>Address:</strong> {profileData.jobSeekerProfile.address}</p>
              <p><strong>Date of Birth:</strong> {dateFormat}</p>
              <p><strong>Phone:</strong> {profileData.user.phone}</p>
            </div>
          </div>
          {/* Education Details Card */}
          <div className="card">
            <div className="card-header">
              <h3>Education Details</h3>
              <button onClick={() => setShowEditEducation(!showEditEducation)}>✏️ Edit</button>
            </div>
            <div className="card-body">
              {educationDetails.length > 0 ? (
                profileData.jobSeekerProfile.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h4>{edu.universityName}</h4>
                    <p>{edu.education} -  {edu.course},{edu.specialization}-{edu.courseType}</p>

                    <p> {edu.startMonth} {edu.startYear}-{edu.endMonth}  {edu.endYear}</p>
                  </div>
                ))
              ) : (
                <p>No education details available</p>
              )}

            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Experience Details</h3>
              <button onClick={() => setShowEditEducation(!showEditEducation)}>✏️ Edit</button>
            </div>
            <div className="card-body">
              <p><strong>Years of Experience:</strong> {profileData.jobSeekerProfile.experience}</p>
              <p><strong>Skills:</strong> {profileData.jobSeekerProfile.skills}</p>
              <p><strong>Resume:</strong> <a href={`http://localhost:5000/${profileData.jobSeekerProfile.resume}`} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p><strong style={{ fontSize: '20px' }}> {userName}</strong></p>
          <div className="card">
            <div className="card-header">
              <h3>Employer Details</h3>
              <button onClick={() => setShowEditPersonal(!showEditPersonal)}>✏️ Edit</button>
            </div>
            <div className="card-body">
              <p><strong>Company Name:</strong> {profileData.employerProfile.companyName}</p>
            </div>
            <div className="card-body">
              <p><strong>Company Address:</strong> {profileData.employerProfile.companyAddress}</p>
            </div>
            <div className="card-body">
              <p><strong>contact Person:</strong> {profileData.employerProfile.contactPerson}</p>
            </div>
            <div className="card-body">
              <p><strong>contact Email:</strong> {profileData.employerProfile.contactEmail}</p>
            </div>
            <div className="card-body">
              <p><strong>website:</strong> {profileData.employerProfile.website}</p>
            </div>
            <div className="card-body">
              <p><strong>company Description:</strong> {profileData.employerProfile.companyDescription}</p>
            </div>
          </div>
        </div>

      )}

    </div>
  );
};

export default ProfilePage;
