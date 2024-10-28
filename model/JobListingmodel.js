const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    qualifications: { type: String, required: true },
    responsibilities: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobListing', jobListingSchema);
