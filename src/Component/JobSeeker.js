import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const JobSeekerForm = () => {
  const userName = localStorage.getItem('userName');
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [jobSeekerDetails, setJobSeekerDetails] = useState({
    fullName: '',
    dob: '',
    jobTitle: '',
    address: '',
    location: '',
    salary: '',
    resume: '',
    education: [{
      education: '', universityName: '', course: '', specialization: '',
      courseType: '', startYear: '', startMonth: '', endYear: '', endMonth: ''
    }],
    skills: ''
  });

  const navigate = useNavigate();
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobSeekerDetails({
      ...jobSeekerDetails,
      [name]: value
    });
  };

  // Handle education input change
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = jobSeekerDetails.education.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setJobSeekerDetails({ ...jobSeekerDetails, education: updatedEducation });
  };
  // Handle adding new education entries
  const addEducationField = () => {
    setJobSeekerDetails({
      ...jobSeekerDetails,
      education: [...jobSeekerDetails.education, {
        education: '', universityName: '', course: '', specialization: '',
        courseType: '', startYear: '', startMonth: '', endYear: '', endMonth: ''
      }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('fullName', jobSeekerDetails.fullName);
    formData.append('jobTitle', jobSeekerDetails.jobTitle);
    formData.append('dob', jobSeekerDetails.dob);
    formData.append('address', jobSeekerDetails.address);
    formData.append('education', JSON.stringify(jobSeekerDetails.education));
    formData.append('experience', jobSeekerDetails.experience);
    formData.append('skills', jobSeekerDetails.skills);
    formData.append('resume', jobSeekerDetails.resume);

    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,  // Attach token in Authorization header
        },
      };
      const response = await axios.post('http://localhost:5000/api/jobSeeker/add',
        formData, config
      );
      if (response.status === 201) {
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error('Error saving job seeker profile:', error);
    }
  };

  return (
    <div>
      <h1> Job Seeker Profile</h1>
      <div className="job-listings">
        <h1>Welcome, {userName || 'Name not available'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>FullName:</label>
            <input type="text" name="fullName" onChange={handleInputChange} />
          </div>
          <div>
            <label>Dob:</label>
            <input type="date" name="dob" onChange={handleInputChange} />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" onChange={handleInputChange} />
          </div>
          <div>
            <label>Skills:</label>
            <input type="text" name="skills" onChange={handleInputChange} />
          </div>
          <div>
            <label>Experience:</label>
            <input type="text" name="experience" onChange={handleInputChange} />
          </div>
          <div>
            <label>JobTitle:</label>
            <input type="text" name="jobTitle" onChange={handleInputChange} />
          </div>

          <h3>Education Details</h3>
          {jobSeekerDetails.education.map((edu, index) => (
            <div key={index}>
              <div>
                <label>Education:</label>
                <input type="text" name="education" placeholder="Education" value={edu.education} onChange={(e) => handleEducationChange(index, e)} />
              </div>
              <div>
                <label>University Name:</label>
                <input type="text" name="universityName" placeholder="UniversityName" value={edu.universityName} onChange={(e) => handleEducationChange(index, e)} />
              </div>
              <div>
                <label>Course Name:</label>
                <input type="text" name="course" placeholder="Course" value={edu.course} onChange={(e) => handleEducationChange(index, e)} />
              </div>
              <div>
                <label>Specialization:</label>
                <input type="text" name="specialization" placeholder="Specialization" value={edu.specialization} onChange={(e) => handleEducationChange(index, e)} />
              </div>
              <div>
                <label>Course Type:</label>
                <select name='courseType' value={edu.courseType} onChange={(e) => handleEducationChange(index, e)}>
                  <option value="fullTime">Full Time</option>
                  <option value="partTime">Part Time</option>
                </select>
              </div>
              <div>
                <label>Start Month:</label>
                <select
                  name="startMonth"
                  value={edu.startMonth}
                  onChange={(e) => handleEducationChange(index, e)}
                >
                  <option value="">Select Start Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                {/* <input type="text" name="starMonth" placeholder="StartMonth" value={edu.startMonth} onChange={(e) => handleEducationChange(index, e)} /> */}
              </div>
              <div>
                <label>Start Year:</label>
                <input type="number" name="startYear" placeholder="StartYear" value={edu.startYear} onChange={(e) => handleEducationChange(index, e)} />
              </div>
              <div>
                <label>End Month:</label>
                <select
                  name="endMonth"
                  value={edu.endMonth}
                  onChange={(e) => handleEducationChange(index, e)}
                >
                  <option value="">Select End Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                {/* <input type="text" name="endMonth" placeholder="EndMonth" value={edu.endMonth} onChange={(e) => handleEducationChange(index, e)} /> */}
              </div>
              <div>
                <label>End Year:</label>
                <input type="number" name="endYear" placeholder="EndYear" value={edu.endYear} onChange={(e) => handleEducationChange(index, e)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={addEducationField}>Add Education +</button>
          {/* <div>
          <label>Education:</label>
          <input type="text" name="education" value={education} onChange={(e) => setEducation(e.target.value)} />
        </div> */}
          <div>
            <label>Upload Resume:</label>
            <input type="file" name="resume" onChange={(e) => setJobSeekerDetails({ ...jobSeekerDetails, resume: e.target.files[0] })} accept=".pdf,.doc,.docx" />
          </div>
          <button type="submit">Save Profile</button>

        </form>
      </div >

    </div>
  );

};

export default JobSeekerForm;

