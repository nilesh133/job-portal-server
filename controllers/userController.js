require('dotenv').config();
const { User, Recruiter } = require("../models/authSchema");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '7d',
    });
};

module.exports.updateUserProfile = async (req, res) => {
    try {
        const response = await User.findByIdAndUpdate(req.body.id,
            {
                name: req.body.name,
                email: req.body.email,
                headline: req.body.headline,
                phone: req.body.phone,
                dob: req.body.dob,
                githublink: req.body.githublink,
                linkedinlink: req.body.linkedinlink,
                userPhotoUrl: req.body.userPhotoUrl,
                education: req.body.education,
                experience: req.body.experience
            },
            { new: true }
        );
        // console.log(response);
        const token = generateToken(response);
        return res.status(200).json({ msg: "User profile updated", token });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}

module.exports.updateRecruiterLogo = async (req, res) => {
    // console.log(req.body)
    try {
        const response = await Recruiter.findByIdAndUpdate(req.body.id,
            {
                companyLogo: req.body.companyLogo
            },
            { new: true }
        );
        const token = generateToken(response);
        return res.status(200).json({ msg: "User profile updated", token });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
        console.log(err)
    }
}

module.exports.updateRecruiterAbout = async (req, res) => {
    // console.log(req.body)
    try {
        const response = await Recruiter.findByIdAndUpdate(req.body.id,
            {
                aboutCompany: req.body.aboutCompany
            },
            { new: true }
        );
        const token = generateToken(response);
        return res.status(200).json({ msg: "User profile updated", token });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
        // console.log(err)
    }
}