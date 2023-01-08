const express = require('express');
const router = express.Router();
const { jobPost, jobValidation, fetchRecruiterJobs, fetchRecruiterSingleJob, fetchUserAllJobs, fetchUserSingleJob, userJobApply, fetchUserProfileView, setJobViewStatus } = require('../controllers/jobController');

router.post('/job-post', jobValidation, jobPost);
router.get('/recruiter-jobs/:id', fetchRecruiterJobs);
router.get('/user-all-jobs', fetchUserAllJobs);
router.get('/user-all-jobs/:companyname/:jobprofile/:id', fetchUserSingleJob);
router.post('/user-job-apply', userJobApply);
router.get('/recruiter-job/:companyname/:jobprofile/:id', fetchRecruiterSingleJob);
router.get('/user-profile-view/:id', fetchUserProfileView);
router.post('/set-job-view-status/:user_id/:companyname/:recruiterid', setJobViewStatus);

module.exports = router;