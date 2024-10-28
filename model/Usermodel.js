const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JobSeeker = require('./JobSeekermodel');
const Employer = require('./Employermodel');
// Define the schema and model for registration
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    workStatus: String,
    jobSeekerProfile:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobSeeker',  // Reference to JobSeeker schema
    },
    employerProfile:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Employer'
    }
 });
  // Define the comparePassword method
  // userSchema.methods.comparePassword = async function (enteredPassword) {
  //   return await bcrypt.compare(enteredPassword, this.password);  // Compare hashed passwords
  // };
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password =  bcrypt.hash(this.password, 10);
    next();
  });
  // console.log("after connection");
  module.exports = mongoose.model('User', userSchema);