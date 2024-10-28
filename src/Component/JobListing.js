import React, { useState } from 'react';
import axios from 'axios';

const CreateJobListing = ({ employerId }) => {
    const [jobListing, setJobListing] = useState({
        jobTitle: '',
        description: '',
        qualifications: '',
        responsibilities: '',
        location: '',
        salaryRange: ''
    });

    const handleChange = (e) => {
        setJobListing({ ...jobListing, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/joblisting', { ...jobListing, employerId });
            alert('Job listing created successfully!');
        } catch (error) {
            console.error('Error creating job listing', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="jobTitle" placeholder="Job Title" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <textarea name="qualifications" placeholder="Qualifications" onChange={handleChange} required />
            <textarea name="responsibilities" placeholder="Responsibilities" onChange={handleChange} required />
            <input name="location" placeholder="Location" onChange={handleChange} required />
            <input name="salaryRange" placeholder="Salary Range" onChange={handleChange} />
            <button type="submit">Create Job Listing</button>
        </form>
    );
};

export default CreateJobListing;
