const {Job} = require("../models/jobSchema");
const {User, Recruiter} = require("../models/authSchema");
const {Messages} = require("../models/messagesSchema");
const jwt = require("jsonwebtoken");
const {body, validationResult, check} = require("express-validator");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '7d',
    });
};

module.exports.jobValidation = [
    body("jobprofile").not().isEmpty().trim().withMessage("Job profile is required"),
    body("jobtype").not().isEmpty().trim().withMessage("Job type is required"),
    body("minsalary").not().isEmpty().trim().withMessage("Min salary is required"),
    body("maxsalary").not().isEmpty().trim().withMessage("Max salary is required"),
    body("aboutcompany").not().isEmpty().trim().withMessage("Please write something about your company"),
    body("minexperience").not().isEmpty().trim().withMessage("Min experience is required"),
    body("maxexperience").not().isEmpty().trim().withMessage("Max experience is required"),
    body("location").not().isEmpty().trim().withMessage("Location is required"),
    body("deadline").not().isEmpty().trim().withMessage("Deadline is required"),
    check('responsibilities.*.responsibility').not().isEmpty().trim().withMessage("Responsibilty cannot be empty"),
]

module.exports.jobPost = async (req, res) => {
    const {recruiter_id, companyname, jobtype, jobprofile, minsalary, maxsalary, aboutcompany, minexperience, maxexperience, location, deadline, responsibilities } = req.body;
    // console.log(responsibilities)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // console.log(errors.array());
        return res.status(400).json({errors: errors.array()})
    }

    try{
        const job = await Job.create({
            recruiter_id: recruiter_id,
            companyname : companyname,
            jobprofile: jobprofile,
            jobtype : jobtype,
            minsalary: minsalary,
            maxsalary: maxsalary,
            aboutcompany: aboutcompany,
            minexperience: minexperience,
            maxexperience: maxexperience,
            location: location,
            deadline: deadline,
            responsibilities: responsibilities
        })

        return res.status(200).json({msg: "Job has been psoted"});
    }
    catch(err){
        // console.log(err)
        return res.status(500).json({errors: err})
    }
}

module.exports.fetchRecruiterJobs = async (req, res) => {
    // console.log(req.params.id)
    try{
        const response = await Job.find({ recruiter_id: req.params.id });
        return res.status(200).json({ response: response });
    }
    catch(err){
        // console.log(err)
        return res.status(500).json({errors: err})
    }
}

module.exports.fetchRecruiterSingleJob = async (req, res) => {
    try{
        const response = await Job.findOne({_id: req.params.id});
        return res.status(200).json({ response: response });
    }
    catch(err){
        // console.log(err)
        return res.status(500).json({errors: err})
    }
}

module.exports.fetchUserAllJobs = async (req, res) => {
    try{
        const response = await Job.find({});
        return res.status(200).json({ response: response });
    }
    catch(err){
        // console.log(err)
        return res.status(500).json({errors: err})
    }
}

module.exports.fetchUserSingleJob = async (req, res) => {
    try{
        const response = await Job.findOne({_id: req.params.id});
        return res.status(200).json({ response: response });
    }
    catch(err){
        // console.log(err)
        return res.status(500).json({errors: err})
    }
}

module.exports.userJobApply = async (req, res) => {
    // console.log(req.body.userid)
    try {
        const result = await Job.findById(req.body.jobid)
        const newappliedUsers = result.appliedUsers;

        newappliedUsers.push({
            user_id: req.body.userid,
            name: req.body.name,
            appliedAt: req.body.appliedAt
        })

        // console.log(newappliedUsers);

        const updatedJob = await Job.findByIdAndUpdate(req.body.jobid,
            {
                appliedUsers: newappliedUsers
            },
            { new: true }
        );

        const previousApplied = await User.findById(req.body.userid)
        const newAppliedCompany = previousApplied.appliedCompany;

        newAppliedCompany.push({
            companyid: req.body.companyid,
            companyname: req.body.companyname,
            jobprofile: req.body.jobprofile,
            noofapplicants: newappliedUsers.length,
            appliedAt: req.body.appliedAt
        })

        console.log(newAppliedCompany);

        const user = await User.findByIdAndUpdate(req.body.userid,
            {
                appliedCompany: newAppliedCompany
            },
            { new: true }
        );

        const token = generateToken(user);
        return res.status(200).json({ msg: "Applied successfully", token, updatedJob });
    }
    catch (err) {
        // console.log(err);
        return res.status(500).json({ errors: err });
    }
}

module.exports.fetchUserProfileView = async (req, res) => {
    // console.log(req.params)
    try{
        const response = await User.findOne({_id: req.params.id});
        return res.status(200).json({ response: response });
    }
    catch(err){
        // console.log(err)
        return res.status(500).json({errors: err})
    }
}

module.exports.setJobViewStatus = async (req, res) => {
    // console.log(req.params.recruiterid)
    try {
        const newAppliedCompany = []
        const user = await User.findOne({_id: req.params.user_id});

        await user.appliedCompany.map((company) => {
            if(company.companyname === req.params.companyname){
                company.viewStatus = true;
            }
            newAppliedCompany.push(company)
        })

        const response = await User.findByIdAndUpdate(req.params.user_id,
            {
                appliedCompany: newAppliedCompany
            },
            { new: true }
        );
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}