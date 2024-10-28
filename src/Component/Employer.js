import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Dashboard from '../Component/Dashboard';

const EmployerForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const userName = localStorage.getItem('userName');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            userId: localStorage.getItem('userId'),  // Assuming userId is stored in localStorage
            companyName,
            companyAddress,
            contactPerson,
            contactEmail,
            contactPhone,
            website,
            companyDescription
        };
        try {
            const token = localStorage.getItem('token');

            const config = {
              headers: {
                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
              },
            };
            const response = await axios.post('http://localhost:5000/api/employer/add', formData,config);
            if (response.status === 201) {
                navigate('/Dashboard'); 
                setMessage('Employer profile created successfully!');
            }
        } catch (error) {
            console.error('Error creating employer profile:', error);
            setMessage('Error creating employer profile');
        }
    };
    return (
        <div>
            <h1>Welcome, {userName || 'Name not available'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company Name:</label>
                    <input type="text" name="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div>
                    <label>Company Address:</label>
                    <input type="text" name="Company Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                </div>
                <div>
                    <label>Contact Person:</label>
                    <input type="text" name="Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                </div>
                <div>
                    <label>Contact Email:</label>
                    <input type="email" name="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </div>
                <div>
                    <label>Contact Phone:</label>
                    <input type="tel" name="Contact Phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                </div>
                <div>
                    <label>Website:</label>
                    <input type="text" name="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div>
                    <label>Company Description:</label>
                    <input type="text" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} />
                    {/* <textarea placeholder="Company Description" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} /> */}
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
export default EmployerForm;