const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const JWT_SECRET = 'mounika123';
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const JobSeeker = require('./model/JobSeekermodel');
const User = require('./model/Usermodel');
const Employer = require('./model/Employermodel');
const JobListing = require('./model/JobListingmodel');

// Initialize Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
console.log("start server");

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zidioDatabase',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// // Multer setup for file uploads (resume)
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create folder if it doesn't exist
}

//Fetch the data....
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone, workStatus } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email, name });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    // Hash the password using bcrypt before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name, email,
      password: hashedPassword,
      phone, workStatus
    });

    await newUser.save(); // Save the user to the database
    res.status(200).json({ message: 'User registered successfully', newUser }); //, userId: newUser._id//
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    if (!user) {
      return res.status(404).json({ token, message: 'User not found' });
    }
    // Return userId and other necessary info
    res.json({ token, userId: user._id, name: user.name, workStatus: user.workStatus }); // Ensure you return userId
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

//Fetch the jobseeker and registrtion details
app.get('/api/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('jobSeekerProfile');
    const employer = await User.findById(userId).populate('employerProfile');

    if (user.jobSeekerProfile) {
      res.status(200).json({
        user, jobSeekerProfile: user.jobSeekerProfile // Job seeker details
      });
    } else {
      res.status(200).json({
        user, employerProfile: employer.employerProfile // Job seeker details
      });
    }
    // Return both user and job seeker profile data

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Middleware to authenticate token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.sendStatus(401); // No token provided
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.sendStatus(403); // Token is not valid
    }
    req.user = user.userId;
    next();
  });
};
app.use(verifyToken);

// Job Seeker Profile Creation (with resume upload)
app.post('/api/jobseeker/add', upload.single('resume'), async (req, res) => {
  try {
    const { userId, fullName, jobTitle, dob, address, education, experience, skills } = req.body;
    const educationDetails = JSON.parse(education);
    const newJobSeeker = new JobSeeker({
      userId,
      fullName, jobTitle,
      dob,
      address
      , education: educationDetails
      , experience, skills,
      resume: req.file ? req.file.path : ''
    });

    // Save the job seeker profile
    const savedJobSeeker = await newJobSeeker.save();

    // Link the job seeker profile to the user
    await User.findByIdAndUpdate(userId, { jobSeekerProfile: savedJobSeeker._id });
    res.status(201).json({ message: 'Job seeker profile created successfully' });
  } catch (e) {
    console.error('Error creating job seeker profile:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

////  Employer Details create/update/delete ////
//  create Employer details
app.post('/api/employer', async (req, res) => {
  try {
    const { userId, companyName, companyAddress, contactPerson, contactEmail, contactPhone, website, companyDescription } = req.body;
    const newEmployer = new Employer({
      userId,
      companyName,
      companyAddress,
      contactPerson,
      contactEmail,
      contactPhone,
      website,
      companyDescription
    });
    const savedEmployer = await newEmployer.save();
    await User.findByIdAndUpdate(userId, { employerProfile: savedEmployer._id });

    res.status(201).json({ message: 'Employer profile created successfully' });
  } catch (error) {
    console.error('Error creating employer profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Getting employer details
app.get('api/employer/:employerId', async (req, res) => {
  try {
    const employerId = req.params.employerId;
    console.log('employerid at serverside', employerId);
    const employer=await Employer.findById(employerId);
    if (!employer) return res.status(404).json({ error: 'Employer not found' });
        res.json(employer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employer profile' });
  }
})

// JobListing create,get,update,delete////
router.post('/joblisting', async (req, res) => {
  const { employerId, jobTitle, description, qualifications, responsibilities, location, salaryRange } = req.body;
  try {
      const jobListing = new JobListing({ employerId, jobTitle, description, qualifications, responsibilities, location, salaryRange });
      await jobListing.save();
      res.status(201).json(jobListing);
  } catch (error) {
      res.status(500).json({ message: 'Error creating job listing', error });
  }
});

router.get('/joblisting/employer/:employerId', async (req, res) => {
  try {
      const jobListings = await JobListing.find({ employerId: req.params.employerId });
      res.status(200).json(jobListings);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching job listings', error });
  }
});

router.put('/joblisting/:id', async (req, res) => {
  const { jobTitle, description, qualifications, responsibilities, location, salaryRange } = req.body;
  try {
      const updatedJobListing = await JobListing.findByIdAndUpdate(req.params.id, {
          jobTitle, description, qualifications, responsibilities, location, salaryRange
      }, { new: true });

      res.status(200).json(updatedJobListing);
  } catch (error) {
      res.status(500).json({ message: 'Error updating job listing', error });
  }
});


// Serving uploaded files
app.use('/Uploads', express.static('Uploads'));

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});