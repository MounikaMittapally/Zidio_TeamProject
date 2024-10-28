const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: String,
  dob: Date,
  address: String,
  // location: String,
  salary: String,
  jobTitle: String,
  resume: String,
  education: [{
    education: String,
    universityName: String,
    course: String,
    specialization: String,
    courseType:  String ,
    startYear: Number, startMonth: String,
    endYear: Number,endMonth: String
  }],
  skills: String,
  experience: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
