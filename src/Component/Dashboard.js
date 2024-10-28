import React from 'react';
import Sidebar from '../Dashboard_d/sidebar';
import Header from '../Dashboard_d/header';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Dashboard = () => {
  console.log("Dashboard");
  //   const [workStatus, setWorkStatus] = useState(''); // Default to 'Employed'
  //   const [employmentDetails, setEmploymentDetails] = useState([]);
  //   const [jobSeekerDetails, setJobSeekerDetails] = useState([]);
  //   const [error, setError] = useState('');
    const navigate = useNavigate();
  //   const userId = localStorage.getItem('userId');// Use the logged-in user's userId

  //   useEffect(() => {
  //     fetchData(); // Fetch data on initial render and when workStatus changes
  // }, [workStatus]);

  // const fetchData = async () => {
  //   setError('');
  //   try {
  //       if (workStatus === 'Employed') {
  //           const response = await axios.get(`/api/employers/${userId}`);
  //           setEmploymentDetails(response.data); // Assuming response contains employment details
  //       } else {
  //           const response = await axios.get(`/api/jobseekers/${userId}`);
  //           setJobSeekerDetails(response.data); // Assuming response contains job seeker details
  //       }
  //   } catch (err) {
  //       setError('Failed to fetch data');
  //   }
  // };
  // const handleWorkStatusChange = (e) => {
  //   setWorkStatus(e.target.value); // Update work status
  // };

  const goToProfile = () => {
    navigate('/profile'); // Assuming the profile route is '/profile'
  };
  // if (error) return <div>{error}</div>;
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <h1>Dashboard</h1>
        {/* <label htmlFor="workStatus">Work Status:</label>
                <select id="workStatus" value={workStatus} onChange={handleWorkStatusChange}>
                    <option value="Employed">Employed</option>
                    <option value="Jobseeker">Jobseeker</option>
                </select> */}
        {/* Display details based on selected work status */}
        {/* {workStatus === 'Employed' && employmentDetails ? ( */}
        {/* //                   <div>
  //                       <h2>Employment Details</h2>
  //                       <h3>{employmentDetails.jobTitle} at {employmentDetails.companyName}</h3>
  //                       <p>{employmentDetails.startDate} - {employmentDetails.endDate}</p>
  //                       <p>{employmentDetails.companyDescription}</p>
  //                   </div>
  //               ) : workStatus === 'Jobseeker' && jobSeekerDetails ? (
  //                   <div>
  //                       <h2>Job Seeker Details</h2>
  //                       <h3>{jobSeekerDetails.jobTitle}</h3>
  //                       <p>Salary: {jobSeekerDetails.salary}</p>
  //                       <p>Resume: <a href={jobSeekerDetails.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
  //                   </div>
  //               ) : (
  //                   <p>No details available for the selected work status.</p>
  //               )} */}

        <button onClick={goToProfile}>View Profile</button>
      </div>
    </div>
  );
}

export default Dashboard;