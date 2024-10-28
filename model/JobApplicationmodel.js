const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobListing', required: true },
    jobSeekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker', required: true },
    resume: { type: String, required: true },  // URL or file path to the resume
    coverLetter: { type: String },
    status: { type: String, default: 'Pending' },  // Status of application (e.g., 'Pending', 'Reviewed', 'Accepted')
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
